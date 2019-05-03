import React from 'react'
import { MDBBtn } from "mdbreact";
import { errorToast, succToast } from "../../../Utils/Toasts";
import { AddRecordModal } from './AddRecordModal';

import { eosio_client } from "../../../../blockchain/eosio-wallet-client";
import { Crypto } from "../../../../blockchain/eosio-crypto";
import { ObjectDecorator } from "../../../../utils/ObjectDecorator";
import { Compressor } from '../../../../utils/Compressor';
import { storeFileToIPFS, retrieveFileFromIPFS } from "../../../../utils/IPFS";

export class AddRecordBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   __checkIfBrowserSupportsFileAPI = () => {
      if (window.File && window.FileReader && window.FileList && window.Blob) {
         return true
      } else {
         errorToast('The File APIs are not fully supported in this browser')
         return false
      }
   }

   onAddRecordBtnClick = () => {
      if (!!!this.__checkIfBrowserSupportsFileAPI())
         return
      this.onModalTogle()
   }

   onModalTogle = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   __tryGetPatientKeyFromBchain = async patient => {
      const doctors = await eosio_client.doctors(eosio_client.getAccountName())
      if (doctors.rows.length !== 1) {
         throw new Error('Seems that you are not a registered doctor')
      }
      let patientRecordsKey = null
      for (const grantedKey of doctors.rows[0].grantedkeys) {
         if (grantedKey.key === patient) {
            patientRecordsKey = grantedKey.value
            break;
         }
      }
      if (!!!patientRecordsKey) {
         throw new Error("Seems this patient didn't granted you any permissions")
      }
      return patientRecordsKey
   }

   __decryptPatientRecordsKey = async params => {
      params.enckey = Crypto.decryptWithRSA(await this.__tryGetPatientKeyFromBchain(params.patient), params.enckey)
      return params
   }

   __tryReadFileFromDisk = requiredInfo => {
      const reader = new FileReader()
      reader.onloadend = ProgressEvent => {
         if (ProgressEvent.target.readyState === FileReader.DONE) {
            requiredInfo.cb(ProgressEvent.target.result)
         }
      }
      reader.onerror = () => {
         requiredInfo.cb(null)
      }
      reader.readAsBinaryString(requiredInfo.fileDetails)
   }

   __wipeEncriptionKey = params => ObjectDecorator.removeProperty(params, 'enckey')

   __getDoctorSpecialtyID = async () => {
      const doctor_table = await eosio_client.doctors(eosio_client.getAccountName())
      return doctor_table.rows[0].specialtyid
   }

   __getNormalizedRecordDetails = async (params, hash) => ({
      patient: params.patient,
      specialtyid: await this.__getDoctorSpecialtyID(),
      hash: hash,
      description: params.description
   })

   __cbWhenFileReadingIsDone = params => async fileContent => {
      try {
         if (!!!fileContent) {
            throw new Error("Unable to read record from disk")
         }
         const encryptedCompressedFileContent = Crypto.encryptWithAES(Compressor.compressLZWURIEncoded(fileContent), params.enckey)
         params = this.__wipeEncriptionKey(params)
         const hashToStoreInBchain = (await storeFileToIPFS(encryptedCompressedFileContent))[0].hash
         const tr_status = await eosio_client.add_record(await this.__getNormalizedRecordDetails(params, hashToStoreInBchain))
         if (!!!tr_status.isSuccess) {
            throw new Error(tr_status.msg)
         }
         succToast('Record added successfully')
      } catch (e) {
         this.__wipeEncriptionKey(params)
         console.error(e)
         errorToast(e.message)
      }
   }

   onAddRecordHandler = async params => {
      this.__tryReadFileFromDisk({
         fileDetails: params.fileDetails,
         cb: this.__cbWhenFileReadingIsDone(await this.__decryptPatientRecordsKey(params))
      })
   }

   render() {
      return (
         <React.Fragment>
            <AddRecordModal
               isOpen={this.state.modal.isOpen}
               toggle={this.onModalTogle}
               onAddRecordClick={this.onAddRecordHandler}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onAddRecordBtnClick}>
               <i className="fa fa-file-medical"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}