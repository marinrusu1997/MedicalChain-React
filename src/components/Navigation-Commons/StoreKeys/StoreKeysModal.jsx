import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import { StoreKeysForm } from './StoreKeysForm';
import { errorToast, succToast } from "../../Utils/Toasts";
import { storeEncryptionKey, storeRecordsKey, retrieveEncryptionKey, retrieveRecordsKey } from "../../../servers/wallet";
import { store } from "../../../store";
import { Crypto } from "../../../blockchain/eosio-crypto";

export class StoreKeysModal extends React.Component {

   constructor(props) {
      super(props)
      this.keys = {}
   }

   onInputChangeHandler = field => this.keys[field.name] = field.value

   validateKeys = () => {
      if (!!!this.keys.password) {
         errorToast('Password is mandatory')
         return false
      }
      if (!!!this.keys.reckey && !!!this.keys.enckey) {
         errorToast('Provide at least one key')
         return false
      }
      return true
   }

   _isRecKeyStoredAlready = async account => {
      if (this.keys.keys_existence_check) {
         if (await retrieveRecordsKey(account)) {
            errorToast('Your Records Key is stored already')
            return true
         } else {
            return false
         }
      } else {
         return false
      }
   }

   _isEncKeyStoredAlready = async account => {
      if (this.keys.keys_existence_check) {
         if (await retrieveEncryptionKey(account)) {
            errorToast('Your Encryption Key is stored already')
            return true
         } else {
            return false
         }
      } else {
         return false
      }
   }

   _storeKeys = async account => {
      let succes = false
      if (this.keys.reckey && !(await this._isRecKeyStoredAlready(account))) {
         if (await storeRecordsKey(account, Crypto.encryptAESWithPassword(this.keys.reckey, this.keys.password))) {
            succToast('Records Key stored')
            succes = true
         } else {
            errorToast('Records Key not stored')
            succes = false
         }
      }
      if (this.keys.enckey && !(await this._isEncKeyStoredAlready(account))) {
         if (await storeEncryptionKey(account, Crypto.encryptAESWithPassword(this.keys.enckey, this.keys.password))) {
            succToast('Encryption Key stored')
            succes = true
         } else {
            errorToast('Encryption Key not stored')
            succes = false
         }
      }
      return succes
   }

   onStoreBtnClick = async () => {
      try {
         if (this.validateKeys()) {
            if (await this._storeKeys(store.getState().app.userName)) {
               this.keys = {}
               this.props.toggle()
            }
         }
      } catch (e) {
         errorToast('Error while storing keys, check console for detailed info')
         console.error(e)
      }
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} cascading>
            <MDBModalHeader
               toggle={this.props.toggle}
               titleClass="d-inline title"
               className="text-center gradient-card-header peach-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="database" />  Store Keys
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <StoreKeysForm onInputChange={this.onInputChangeHandler} >
                  <div className="text-center">
                     <button className="btn btn-success" onClick={this.onStoreBtnClick}>
                        Store
                     </button>
                  </div>
               </StoreKeysForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}