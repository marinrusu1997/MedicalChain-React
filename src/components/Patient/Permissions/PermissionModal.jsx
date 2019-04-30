import React from 'react'
import {
   MDBModal,
   MDBModalHeader,
   MDBModalBody,
   MDBIcon
} from 'mdbreact'
import { AddPermForm } from './AddPermForm'
import { UpdatePermForm } from './UpdatePermForm'
import { validateForAdding, validateForUpdating } from '../../Permission-Commons/PermValidator'
import { TransactionReceipt } from '../../Modals/TransactionReceipt'

import { eosio_client } from "../../../blockchain/eosio-wallet-client"
import { Crypto } from "../../../blockchain/eosio-crypto"
import { retrieveEncryptionKey, retrieveRecordsKey } from "../../../servers/wallet"

import { errorToast } from "../../Utils/Toasts";

export class PermissionModal extends React.Component {
   constructor(props) {
      super(props)
      this.permFromForm = null
      this.__resetPermFromForm()
      this.state = {
         modalSize: "nm",
         isTrInfoVisible: false
      }
   }

   componentDidUpdate() {
      if (this.props.isAddingModal === false) {
         this.permFromForm = {
            interval: this.props.permInfoForModify.interval,
            start: this.props.permInfoForModify.start_time,
            stop: this.props.permInfoForModify.end_time,
            right: this.props.permInfoForModify.right,
            specialties: this.props.permInfoForModify.specialties
         }
      }
   }

   __resetPermFromForm = () => {
      this.permFromForm = {
         interval: 'LIMITED'
      }
      this.__resetPermFromFormKeys()
   }

   __resetPermFromFormPassword = () => {
      this.permFromForm.password = null
   }

   __resetPermFromFormKeys = () => {
      this.permFromForm.decreckey = ""
      this.permFromForm.enckey = ""
   }

   __isRecordsKeyEmpty = () => {
      return this.permFromForm.decreckey === ""
   }

   __checkIfKeysNeedToBeLoadedFromWallet = async () => {
      if (this.permFromForm.password && this.permFromForm.password.length !== 0 && this.__isRecordsKeyEmpty()) {
         const recordsKeyFromWallet = await retrieveRecordsKey(eosio_client.getAccountName())
         if (!!!recordsKeyFromWallet) {
            throw new Error("Can't load records key.Please input keys manually")
         }
         const encryptionKeyFromWallet = await retrieveEncryptionKey(eosio_client.getAccountName())
         if (!!!encryptionKeyFromWallet) {
            throw new Error("Can't load encryption key.Please input keys manually")
         }
         this.permFromForm.decreckey = Crypto.decryptAESWithPassword(recordsKeyFromWallet, this.permFromForm.password)
         this.permFromForm.enckey = Crypto.decryptAESWithPassword(encryptionKeyFromWallet, this.permFromForm.password)
         this.__resetPermFromFormPassword()
      }
   }

   _getNormalizedAddingPerm = () => ({
      doctor: this.permFromForm.doctor,
      specialtyids: this.permFromForm.specialties.map(specialty => this.props.permNomenclatories.specialitiesNomenclatory.get(specialty)),
      rightid: this.props.permNomenclatories.rightsNomenclatory.get(this.permFromForm.right),
      from: this.permFromForm.interval === "LIMITED" ? (Date.parse(this.permFromForm.start) / 1000).toFixed(0) : 0,
      to: this.permFromForm.interval === "LIMITED" ? (Date.parse(this.permFromForm.stop) / 1000).toFixed(0) : 0,
      decreckey: this.permFromForm.decreckey,
      enckey: this.permFromForm.enckey
   })

   _getNormalizedUpdatedPerm = () => ({
      specialtyids: this.permFromForm.specialties.map(specialty => this.props.permNomenclatories.specialitiesNomenclatory.get(specialty)),
      rightid: this.props.permNomenclatories.rightsNomenclatory.get(this.permFromForm.right),
      from: this.permFromForm.interval === "LIMITED" ? (Date.parse(this.permFromForm.start) / 1000).toFixed(0) : 0,
      to: this.permFromForm.interval === "LIMITED" ? (Date.parse(this.permFromForm.stop) / 1000).toFixed(0) : 0
   })

   handleUpsert = async () => {
      try {
         if (!!!this.props.isAddingModal) {
            if (validateForUpdating(this.permFromForm)) {               
               this.props.onUpsert(this._getNormalizedUpdatedPerm())
            }
         } else if (validateForAdding(this.permFromForm)) {
            await this.__checkIfKeysNeedToBeLoadedFromWallet()
            this.props.onUpsert(this._getNormalizedAddingPerm())
            this.__resetPermFromFormKeys()
         }
      } catch (e) {
         console.error(e)
         errorToast(e.message)
      }
   }

   handleInputChange = event => {
      if (event.target.name === 'interval' && event.target.value === 'LIMITED') {
         this.permFromForm.start = null
         this.permFromForm.stop = null
      }
      this.permFromForm[event.target.name] = event.target.value
   }

   handleCollapse = () => {
      this.setState({
         modalSize: !!!this.state.isTrInfoVisible === true ? 'lg' : 'nm',
         isTrInfoVisible: !!!this.state.isTrInfoVisible
      })
   }

   handleTogle = () => {
      this.setState({ modalSize: "nm", isTrInfoVisible: false })
      this.props.toggle()
      this.__resetPermFromForm()
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading size={this.state.modalSize}>
            <MDBModalHeader
               toggle={this.handleTogle}
               titleClass="d-inline title"
               className="text-center gradient-card-header blue-gradient darken-2 white-text">
               {this.props.isAddingModal &&
                  <em>
                     <MDBIcon icon="file-contract" /> Add Permission
                  </em>}
               {!!!this.props.isAddingModal &&
                  <em>
                     <MDBIcon icon="file-signature" /> Update Permission
                  </em>}
            </MDBModalHeader>
            <MDBModalBody>
               {this.props.header_msg}
               {this.props.isAddingModal &&
                  <AddPermForm
                     permNomenclatories={this.props.permNomenclatories}
                     onInputChange={this.handleInputChange}>
                     <div className="text-center">
                        <button className="btn btn-info" onClick={this.handleUpsert}>
                           Add
                        </button>
                     </div>
                  </AddPermForm>
               }
               {!!!this.props.isAddingModal &&
                  <UpdatePermForm permNomenclatories={this.props.permNomenclatories} permInfo={this.props.permInfoForModify} onInputChange={this.handleInputChange} >
                     <div className="text-center">
                        <button className="btn btn-info" onClick={this.handleUpsert}>
                           Update
                        </button>
                     </div>
                  </UpdatePermForm>
               }
               {this.props.tr_receipt &&
                  <TransactionReceipt
                     isCollapsed={this.state.isTrInfoVisible}
                     onCollapse={this.handleCollapse}
                     tr_receipt={this.props.tr_receipt}
                  />
               }
            </MDBModalBody>
         </MDBModal>
      )
   }
}