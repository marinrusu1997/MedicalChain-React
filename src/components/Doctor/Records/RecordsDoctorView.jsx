import React from 'react'
import { connect } from 'react-redux'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBDataTable, MDBBtn } from "mdbreact"
import { AddRecordBtn } from './AddRecord/AddRecordBtn';
import { ReadRecordsBtn } from './ReadRecords/ReadRecordsBtn';
import { KeysRequestModal } from "../../ReadRecords-Commons/KeysRequest/KeysRequestModal";
import { table_model } from '../../ReadRecords-Commons/RecordsTableModel';
import { getPatientFullNameFromAccount } from "../../../servers/identification";
import { ViewRecordLogic } from "../../ReadRecords-Commons/ViewRecord";

export class _RecordsDoctorView extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         patient: {
            account: null,
            fullName: null
         },
         table: {
            columns: table_model,
            rows: []
         },
         keysModal: {
            isOpen: false
         }
      }
      this.specialitiesNomenclatory = {
         normal: null,
         reversed: null
      }
      this.onEncryptionKeyProvidedForRecordViewHandler = null
   }

   togleKeysModal = () => {
      this.setState({ keysModal: { isOpen: !!!this.state.keysModal.isOpen } })
   }

   _tryMakeReversedSpecialtiesNomenclatory = () => {
      if (!!!this.specialitiesNomenclatory.reversed && this.props.specialitiesNomenclatory) {
         this.specialitiesNomenclatory.normal = this.props.specialitiesNomenclatory
         this.specialitiesNomenclatory.reversed = new Map()
         this.props.specialitiesNomenclatory.forEach((v, k) => this.specialitiesNomenclatory.reversed.set(v, k))
      }
   }

   componentDidUpdate() {
      this._tryMakeReversedSpecialtiesNomenclatory()
   }

   componentDidMount() {
      this._tryMakeReversedSpecialtiesNomenclatory()
   }

   __makeOnClickHandlerForViewButton = hash => {
      return async () => {
         this.onEncryptionKeyProvidedForRecordViewHandler = async enckey => {
            try {
               ViewRecordLogic.viewRecordContent(await ViewRecordLogic.tryRetrieveRecordFromIPFS(hash,
                  await ViewRecordLogic.tryGetPatientKeyFromBchain(this.state.patient.account, enckey)))
               enckey = null
               this.togleKeysModal()
            } catch (e) {
               console.error(e)
               throw e
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

   __makeRecordRow = record_row => ({
      ...record_row,
      view: this.__makeViewButton(record_row.hash)
   })

   __tryRetrievePatientFullName = async account => {
      const patient = {
         account: account,
         fullName: null
      }
      const fullName = await getPatientFullNameFromAccount(account)
      if (fullName) {
         patient.fullName = fullName.surname + " " + fullName.name
      }
      return patient
   }

   __makeNewState = async (table_rows, patient_account) => ({
      patient: await this.__tryRetrievePatientFullName(patient_account),
      table: {
         columns: table_model,
         rows: table_rows
      }
   })

   onReadRecordsDoneHandler = async (record_rows, patient) => {
      const rows = []
      for (const record_row of record_rows) {
         rows.push(this.__makeRecordRow(record_row))
      }
      this.setState(await this.__makeNewState(rows, patient))
   }

   render() {
      return (
         <React.Fragment>
            <KeysRequestModal
               isOpen={this.state.keysModal.isOpen}
               toggle={this.togleKeysModal}
               onEncryptionKeyProvided={this.onEncryptionKeyProvidedForRecordViewHandler}
            />
            <MDBCard narrow>
               <MDBCardHeader className="view view-cascade gradient-card-header peach-gradient darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                  <div>
                  </div>
                  <a href="#!" className="white-text mx-3">Patient Records Management</a>
                  <div>
                     <AddRecordBtn specialitiesNomenclatory={this.specialitiesNomenclatory} />
                     <ReadRecordsBtn specialitiesNomenclatory={this.specialitiesNomenclatory} onReadRecordsDone={this.onReadRecordsDoneHandler} />
                  </div>
               </MDBCardHeader>
               <MDBCardBody cascade>
                  <center><font color="black">{this.state.patient.fullName || this.state.patient.account}</font></center>
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
         </React.Fragment>
      )
   }
}

const mapStateToProps = state => {
   return {
      specialitiesNomenclatory: state.blockchain.specialities
   }
}

export const RecordsDoctorView = connect(mapStateToProps, null)(_RecordsDoctorView)