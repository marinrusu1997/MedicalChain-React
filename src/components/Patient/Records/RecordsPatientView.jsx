import React from 'react'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBDataTable, MDBBtn } from "mdbreact"
import { table_model } from "../../ReadRecords-Commons/RecordsTableModel"
import { ReadRecordsLogic } from "./ReadRecordsLogic";
import { errorToast } from '../../Utils/Toasts';
import { KeysRequestModal } from '../../ReadRecords-Commons/KeysRequest/KeysRequestModal';
import { ViewRecordLogic } from "../../ReadRecords-Commons/ViewRecord";
import { ReadAllRecordsBtn } from './ReadAllRecords/ReadAllRecordsBtn';
import { DoctorAccToFnameMapper } from '../../ReadRecords-Commons/DoctorAccToFNameMapper';
import { Footer } from '../../Utils/Footer';

export class RecordsPatientView extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         table: {
            columns: table_model,
            rows: []
         },
         keysModal: {
            isOpen: false
         }
      }
      this.doctorAccToFNameMapper = new DoctorAccToFnameMapper()
      this.onRecordsKeyProvidedForRecordViewHandler = null
   }

   _getNormalizedDateTime = posix => {
      const date = new Date(posix * 1000)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return date.toJSON().slice(0, 10) + "T" + (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes)
   }

   __getDoctorNameToDisplay = (account, doctor_fname_flag) => {
      if (!!!doctor_fname_flag) {
         return account
      }
      return this.doctorAccToFNameMapper.getFullNameOrAccountIfMissing(account)
   }

   __makeOnClickHandlerForViewButton = hash => {
      return async () => {
         this.onRecordsKeyProvidedForRecordViewHandler = async reckey => {
            try {
               ViewRecordLogic.viewRecordContent(await ViewRecordLogic.tryRetrieveRecordFromIPFS(hash, reckey))
               this.togleKeysModal()
            } catch (e) {
               console.error(e)
               errorToast(e.message)
            }
         }
         this.togleKeysModal()
      }
   }

   __makeViewButton = hash => (
      <MDBBtn
         className="btn btn-info"
         gradient="blue"
         size="sm"
         onClick={this.__makeOnClickHandlerForViewButton(hash)}
      >
         View
      </MDBBtn>
   )

   __makeRecordRowForViewTable = (speciality, recordMetadata, doctor_fname_flag) => ({
      hash: recordMetadata.hash,
      specialty: speciality,
      timestamp: this._getNormalizedDateTime(recordMetadata.timestamp),
      doctor: this.__getDoctorNameToDisplay(recordMetadata.doctor, doctor_fname_flag),
      description: recordMetadata.description,
      view: this.__makeViewButton(recordMetadata.hash)
   })

   __parseRecordsTableToViewTable = (recods_table, doctor_fname_flag) => {
      const rows = []
      let specialityStr = null
      let specialityRecords = null
      for (const speciality in recods_table) {
         specialityStr = String(speciality)
         specialityRecords = recods_table[speciality]
         for (const recordMetadata of specialityRecords) {
            rows.push(this.__makeRecordRowForViewTable(specialityStr, recordMetadata, doctor_fname_flag))
         }
      }
      return rows
   }

   __filterMissingDoctorAccs = recordsJSON => {
      const missingDocAccounts = new Set()
      let currentRecordDetailsArray = null
      for (const specialty_id in recordsJSON) {
         currentRecordDetailsArray = recordsJSON[specialty_id]
         for (const recordDetails of currentRecordDetailsArray) {
            if (!!!this.doctorAccToFNameMapper.getFullName(recordDetails.doctor)) {
               missingDocAccounts.add(recordDetails.doctor)
            }
         }
      }
      return Array.from(missingDocAccounts)
   }

   __getViewTableRows = async (recordsJSON, doctor_fname_flag) => {
      if (doctor_fname_flag) {
         await this.doctorAccToFNameMapper.tryRetrieveFullNames(this.__filterMissingDoctorAccs(recordsJSON))
      }
      return this.__parseRecordsTableToViewTable(recordsJSON, doctor_fname_flag)
   }

   _tryLoadRecordsFromBchain = async doctor_fname_flag => {
      try {
         this.setState({
            table: {
               columns: table_model,
               rows: await this.__getViewTableRows(await ReadRecordsLogic.readRecordsMetadataFromBchainAsPatient(), doctor_fname_flag)
            }
         })
      } catch (e) {
         errorToast(e.message)
      }
   }

   togleKeysModal = () => {
      this.setState({ keysModal: { isOpen: !!!this.state.keysModal.isOpen } })
   }

   render() {
      return (
         <React.Fragment>
            <KeysRequestModal
               isOpen={this.state.keysModal.isOpen}
               toggle={this.togleKeysModal}
               onEncryptionKeyProvided={this.onRecordsKeyProvidedForRecordViewHandler}
               reqForRecKey
            />
            <MDBCard narrow>
               <MDBCardHeader className="view view-cascade gradient-card-header peach-gradient darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                  <div>
                  </div>
                  <a href="#!" className="white-text mx-3"><i>Records Management</i></a>
                  <div>
                     <ReadAllRecordsBtn onReadAllRecordsHandler={this._tryLoadRecordsFromBchain} />
                  </div>
               </MDBCardHeader>
               <MDBCardBody cascade>
                  <MDBDataTable
                     entriesOptions={[10, 20, 30, 40, 50]}
                     infoLabel={["Showing", "to", "of", "records"]}
                     tbodyColor="blue lighten-5"
                     theadColor="purple lighten-5"
                     responsive
                     hover
                     small
                     data={this.state.table}
                  />
               </MDBCardBody>
            </MDBCard>
            <Footer />
         </React.Fragment>
      )
   }
}