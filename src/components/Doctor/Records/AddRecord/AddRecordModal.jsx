import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import { AddRecordForm } from './AddRecordForm';
import { validateAddParams } from "./AddRecordFormValidator";

import { errorToast } from "../../../Utils/Toasts";
import { retrieveEncryptionKey } from "../../../../servers/wallet";
import { eosio_client } from "../../../../blockchain/eosio-wallet-client";
import { Crypto } from "../../../../blockchain/eosio-crypto";
import { ObjectDecorator } from "../../../../utils/ObjectDecorator";

export class AddRecordModal extends React.Component {

   constructor(props) {
      super(props)
      this.addRecordParams = {}
   }

   onInputChangeHandler = event => {
      this.addRecordParams[event.target.name] = event.target.value
   }

   _tryRetriveEncryptionKeyFromWallet = async () => {
      if (this.addRecordParams.password) {
         const keyFromWallet = await retrieveEncryptionKey(eosio_client.getAccountName())
         if (!!!keyFromWallet) {
            throw new Error('Failed to retrieve your encryption key from wallet. You must enter it manually')
         }
         this.addRecordParams.enckey = Crypto.decryptAESWithPassword(keyFromWallet, this.addRecordParams.password)
         this.addRecordParams.password = null
         this.addRecordParams = ObjectDecorator.removeProperty(this.addRecordParams, 'password')
      }
   }

   onAddBtnClickHandler = async () => {
      try {
         if (validateAddParams(this.addRecordParams)) {
            await this._tryRetriveEncryptionKeyFromWallet()
            await this.props.onAddRecordClick(this.addRecordParams)
         }
      } catch (e) {
         console.error(e)
         errorToast(e.message)
      }
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
            <MDBModalHeader
               toggle={this.props.toggle}
               titleClass="d-inline title"
               className="text-center gradient-card-header blue-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="file-medical-alt" />  Add Medical Record
            </em>
            </MDBModalHeader>
            <MDBModalBody>
               <AddRecordForm onInputChange={this.onInputChangeHandler} specialitiesNomenclatory={this.props.specialitiesNomenclatory.reversed}>
                  <div className="text-center">
                     <button className="btn btn-info" onClick={this.onAddBtnClickHandler}>
                        Add
                     </button>
                  </div>
               </AddRecordForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}