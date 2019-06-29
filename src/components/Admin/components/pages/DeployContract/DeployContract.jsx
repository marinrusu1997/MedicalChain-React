import React from 'react'
import { MDBCard, MDBCardBody, MDBIcon, MDBFormInline, MDBBtn, MDBCardHeader } from 'mdbreact';
import { FileInput } from "../../../../Utils/FileInput";
import { errorToast, infoToast } from "../../../../Utils/Toasts";
import { eosio_client } from '../../../../../blockchain/eosio-wallet-client'

export class DeployContract extends React.Component {

   constructor(props) {
      super(props)
      this.fileDetails = {
         wasm: null,
         abi: null
      }
      this.fileReader = new FileReader()
   }


   onWASMFileSelected = details => this.fileDetails.wasm = details

   onABIFileSelected = details => this.fileDetails.abi = details

   _validateFileDetailsExistence = () => {
      if (!!!this.fileDetails.wasm) {
         errorToast('Please select wasm file')
         return false
      }
      if (!!!this.fileDetails.abi) {
         errorToast('Please select abi file')
         return false
      }
      return true
   }

   __tryReadFileFromDisk = requiredInfo => {
      this.fileReader.onloadend = ProgressEvent => {
         if (ProgressEvent.target.readyState === FileReader.DONE) {
            requiredInfo.cb(ProgressEvent.target.result)
         }
      }
      this.fileReader.onerror = () => {
         requiredInfo.cb(null)
      }
      this.fileReader.readAsBinaryString(requiredInfo.fileDetails)
   }

   _cbWhenWASMReaded = wasmContent => {
      if (!!!wasmContent) {
         return errorToast('Failed to read WASM file from disk')
      }
      this.__tryReadFileFromDisk({
         fileDetails: this.fileDetails.abi,
         cb: this._cbWhenABIReaded(wasmContent)
      })
   }

   _cbWhenABIReaded = wasmContent => async abiContent => {
      if (!!!abiContent) {
         return errorToast('Failed to read ABI file from disk')
      }
      const status = await eosio_client.deploy_contract({
         wasm: wasmContent,
         abi: abiContent
      })
      if (status.isSuccess) {
         infoToast('ABI deployed')
      } else {
         errorToast(status.msg)
      }
   }

   onDeploy = () => {
      if (this._validateFileDetailsExistence()) {
         this.__tryReadFileFromDisk({
            fileDetails: this.fileDetails.wasm,
            cb: this._cbWhenWASMReaded
         })
      }
   }

   render() {
      return (
         <>
            <MDBCard className="mb-5">
               <MDBCardHeader color="primary-color" tag="h3">
                  <center>
                     Deploy Smart Contract
                  </center>
               </MDBCardHeader>
               <MDBCardBody id="breadcrumb" className="d-flex align-items-center justify-content-between">
                  <MDBFormInline className="md-form m-0 needs-validation" noValidate>
                     <MDBIcon far icon="file-code" className="teal-text" size="2x" style={{ 'marginTop': '2.5%', 'marginRight': '1%' }} />
                     <FileInput
                        id="wasm-file"
                        fileExtensions=".wasm"
                        icon={{ className: '', type: '' }}
                        label="WASM file"
                        invalid_feedback="Please select the wasm file"
                        onFileSelected={this.onWASMFileSelected}
                     />
                     <MDBIcon far icon="file-code" className="teal-text" size="2x" style={{ 'marginTop': '2.5%', 'marginRight': '1%' }} />
                     <FileInput
                        id="abi-file"
                        fileExtensions=".abi"
                        icon={{ className: '', type: '' }}
                        label="ABI file"
                        invalid_feedback="Please select the abi file"
                        onFileSelected={this.onABIFileSelected}
                     />
                  </MDBFormInline>
                  <MDBBtn style={{ 'marginTop': '2%', 'marginRight': '40%' }} onClick={this.onDeploy}>
                     Deploy
                  </MDBBtn>
               </MDBCardBody>
            </MDBCard>
         </>
      )
   }
}