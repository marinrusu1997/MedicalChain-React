import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact"
import { KeysRequestForm } from "./KeysRequestForm"
import { validateKeysRequestForm } from "./KeysRequestFormValidator"

import { errorToast } from "../../../Utils/Toasts";
import { retrieveEncryptionKey } from "../../../../servers/wallet";
import { eosio_client } from "../../../../blockchain/eosio-wallet-client";
import { Crypto } from "../../../../blockchain/eosio-crypto";
import { ObjectDecorator } from "../../../../utils/ObjectDecorator";

export class KeysRequestModal extends React.Component {

   constructor(props) {
      super(props)
      this.keys = {}
   }

   onInputChangeHandler = event => {
      this.keys[event.target.name] = event.target.value
   }

   _tryRetriveEncryptionKeyFromWallet = async () => {
      if (this.keys.password) {
         const keyFromWallet = await retrieveEncryptionKey(eosio_client.getAccountName())
         if (!!!keyFromWallet) {
            throw new Error('Failed to retrieve your encryption key from wallet. You must enter it manually')
         }
         this.keys.enckey = Crypto.decryptAESWithPassword(keyFromWallet, this.keys.password)
         this.keys.password = null
         this.keys = ObjectDecorator.removeProperty(this.keys, 'password')
      }
   }

   onProvideBtnClickHandler = async () => {
      try {
         if (validateKeysRequestForm(this.keys)) {
            await this._tryRetriveEncryptionKeyFromWallet()
            await this.props.onEncryptionKeyProvided(this.keys.enckey)
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
               className="text-center gradient-card-header peach-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="key" /> Your Encryption Key
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <KeysRequestForm onInputChange={this.onInputChangeHandler} >
                  <div className="text-center">
                     <button className="btn btn-success" onClick={this.onProvideBtnClickHandler}>
                        Provide
                     </button>
                  </div>
               </KeysRequestForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}