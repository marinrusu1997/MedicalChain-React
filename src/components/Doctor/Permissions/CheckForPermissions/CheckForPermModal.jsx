import React from "react";
import { PermDetailsForm } from "../PermDetailsForm/PermDetailsForm";
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from 'mdbreact'
import { validatePermFromForm } from "../PermDetailsForm/PermDetailsFormValidator";

export class CheckForPermModal extends React.Component {
   constructor(props) {
      super(props)
      this.permFromForm = {
         interval: 'LIMITED'
      }
   }

   __resetPermFromForm = () => {
      this.permFromForm = {
         interval: 'LIMITED'
      }
   }

   _getNormalizedPerm = () => ({
      patient: this.permFromForm.patient,
      specialtyids: this.permFromForm.specialties.map(specialty => this.props.permNomenclatories.specialitiesNomenclatory.get(specialty)),
      rightid: this.props.permNomenclatories.rightsNomenclatory.get(this.permFromForm.right),
      interval: {
         from: parseInt((Date.parse(this.permFromForm.start) / 1000).toFixed(0)),
         to: parseInt((Date.parse(this.permFromForm.stop) / 1000).toFixed(0))
      }
   })

   onInputChange = event => {
      this.permFromForm[event.target.name] = event.target.value
   }

   handleTogle = () => {
      this.props.toggle()
      this.__resetPermFromForm()
   }

   handleCheckForPerm = () => {
      if (validatePermFromForm(this.permFromForm))
         this.props.onCheckForPerm(this._getNormalizedPerm())
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