import React from "react";
import { PermDetailsForm } from "./PermDetailsForm";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from 'mdbreact'

export class CheckForPermModal extends React.Component {
   constructor(props) {
      super(props)
      this.permFromForm = {}
   }

   __resetPermFromForm = () => {
      this.permFromForm = {}
   }

   onInputChange = event => {
      this.permFromForm[event.target.name] = event.target.value
   }

   handleTogle = () => {
      this.props.toggle()
      this.__resetPermFromForm()
   }

   handleCheckForPerm = () => {
      this.props.onCheckForPerm(this.permFromForm)
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
            <MDBModalHeader
               toggle={this.handleTogle}
               titleClass="d-inline title"
               className="text-center gradient-card-header blue-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="file-contract" /> Check for Permission
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <PermDetailsForm
                  permNomenclatories={this.props.permNomenclatories}
                  onInputChange={this.onInputChange}
               >
                  <div className="text-center">
                     <button className="btn btn-info" onClick={this.handleCheckForPerm}>
                        Check
                     </button>
                  </div>
               </PermDetailsForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}