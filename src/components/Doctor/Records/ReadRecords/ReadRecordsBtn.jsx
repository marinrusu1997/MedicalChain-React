import React from 'react'
import { MDBBtn } from "mdbreact";
import { ReadRecordsModal } from "./ReadRecordsModal";
import { errorToast } from "../../../Utils/Toasts";
import { eosio_client } from "../../../../blockchain/eosio-wallet-client";
import { DoctorAccToFnameMapper } from '../../../ReadRecords-Commons/DoctorAccToFNameMapper';

export class ReadRecordsBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
      this.doctorAccToFNameMapper = new DoctorAccToFnameMapper()
   }

   onModalTogle = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   onReadRecordsBtnClick = () => {
      if (!!!this.props.specialitiesNomenclatory.reversed) {
         errorToast('Specialities nomenclatory is not loaded')
         return
      }
      this.onModalTogle()
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

   _getNormalizedRecordsRows = (recordsJSON, doctor_fname_flag) => {
      const rows = []
      let currentRecordDetailsArray = null
      let currentSpecialtyString = null
      for (const specialty_id in recordsJSON) {
         currentRecordDetailsArray = recordsJSON[specialty_id]
         currentSpecialtyString = this.props.specialitiesNomenclatory.normal.get(Number(specialty_id))
         for (const recordDetails of currentRecordDetailsArray) {
            rows.push({
               hash: recordDetails.hash,
               specialty: currentSpecialtyString,
               timestamp: this._getNormalizedDateTime(recordDetails.timestamp),
               doctor: this.__getDoctorNameToDisplay(recordDetails.doctor, doctor_fname_flag),
               description: recordDetails.description
            })
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

   onReadRecordsHandler = async querryDetails => {
      try {
         const tr_status = await eosio_client.read_records(querryDetails)
         if (!!!tr_status.isSuccess) {
            throw new Error(tr_status.msg)
         }
         const recordsJSON = JSON.parse(tr_status.tr_receipt.processed.action_traces[0].console)
         if (querryDetails.doctor_full_name_flag) {
            await this.doctorAccToFNameMapper.tryRetrieveFullNames(this.__filterMissingDoctorAccs(recordsJSON))
         }
         const table_rows = this._getNormalizedRecordsRows(recordsJSON, querryDetails.doctor_full_name_flag)
         if (table_rows.length === 0) {
            throw new Error("No records found")
         }
         this.props.onReadRecordsDone(table_rows, querryDetails.patient)
      } catch (e) {
         console.error(e)
         errorToast(e.message)
      }
   }

   render() {
      return (
         <React.Fragment>
            <ReadRecordsModal
               isOpen={this.state.modal.isOpen}
               toggle={this.onModalTogle}
               onReadRecords={this.onReadRecordsHandler}
               specialitiesNomenclatory={this.props.specialitiesNomenclatory}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onReadRecordsBtnClick}>
               <i className="fa fa-notes-medical"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}