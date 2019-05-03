import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact"
import { KeysRequestForm } from "./KeysRequestForm"
import { validateKeysRequestForm } from "./KeysRequestFormValidator"

import { errorToast } from "../../Utils/Toasts";
import { retrieveEncryptionKey, retrieveRecordsKey } from "../../../servers/wallet";
import { eosio_client } from "../../../blockchain/eosio-wallet-client";
import { Crypto } from "../../../blockchain/eosio-crypto";
import { ObjectDecorator } from "../../../utils/ObjectDecorator";

export class KeysRequestModal extends React.Component {

   constructor(props) {
      super(props)
      this.keys = {}
   }

   onInputChangeHandler = event => {
      this.keys[event.target.name] = event.target.value
   }

   __tryRetrieveKeyFromWallet = async keyTypeRetriever => {
      if (this.keys.password) {
         const keyFromWallet = await keyTypeRetriever(eosio_client.getAccountName())
         if (!!!keyFromWallet) {
            throw new Error('Failed to retrieve your key from wallet. You must enter it manually')
         }
         this.keys.enckey = Crypto.decryptAESWithPassword(keyFromWallet, this.keys.password)
         this.keys.password = null
         this.keys = ObjectDecorator.removeProperty(this.keys, 'password')
      }
   }

   onProvideBtnClickHandler = async () => {
      try {
         if (validateKeysRequestForm(this.keys)) {
            if (!!!this.props.reqForRecKey) {
               await this.__tryRetrieveKeyFromWallet(retrieveEncryptionKey)
            } else {
               await this.__tryRetrieveKeyFromWallet(retrieveRecordsKey)
            }
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
                  <MDBIcon icon="key" />
                  {!!!this.props.reqForRecKey && "Your Encryption Key"}
                  {this.props.reqForRecKey && "Your Records Key"}
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