import React from 'react'
import {
   MDBModal,
   MDBModalHeader,
   MDBModalBody,
   MDBIcon
} from 'mdbreact'
import { AddPermForm } from './AddPermForm';
import { UpdatePermForm } from './UpdatePermForm';
import { validate } from './PermValidator';
import { TransactionReceipt } from '../../Modals/TransactionReceipt';

export class PermissionModal extends React.Component {
   constructor(props) {
      super(props)
      this.permFromForm = {
         interval: 'LIMITED'
      }
      this.state = {
         modalSize: "nm",
         isTrInfoVisible: false
      }
   }

   _getNormalizedPerm = () => ({
      doctor: this.permFromForm.doctor,
      specialtyid: this.props.permission.specialitiesNomenclatory.get(this.permFromForm.specialty),
      rightid: this.props.permission.rightsNomenclatory.get(this.permFromForm.right),
      from: this.permFromForm.interval === "LIMITED" ? (Date.parse(this.permFromForm.start) / 1000).toFixed(0) : 0,
      to: this.permFromForm.interval === "LIMITED" ? (Date.parse(this.permFromForm.stop) / 1000).toFixed(0) : 0
   })

   handleUpsert = () => {
      if (!!!validate(this.permFromForm))
         return
      this.props.onUpsert(this._getNormalizedPerm())
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
               {this.props.isAddingModal &&
                  <AddPermForm perm={this.props.permission} onInputChange={this.handleInputChange} >
                     <div className="text-center">
                        <button className="btn btn-info" onClick={this.handleUpsert}>
                           Add
                     </button>
                     </div>
                  </AddPermForm>
               }
               {!!!this.props.isAddingModal &&
                  <UpdatePermForm perm={this.props.permission} onInputChange={this.handleInputChange} >
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