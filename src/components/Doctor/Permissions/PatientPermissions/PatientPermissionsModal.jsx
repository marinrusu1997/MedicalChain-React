import React from "react"
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact"
import { PatientPermissionsForm } from "./PatientPermissionsForm";
import { validatePatientPermissionsForm } from "./PatientPermissionsFormValidator";
import { errorToast } from "../../../Utils/Toasts";

export class PatientPermissionsModal extends React.Component {

   constructor(props) {
      super(props)
      this.requestedPatient = null
   }

   onInputChangeHandler = event => this.requestedPatient = event.target.value

   onRequestPatientPermsHandler = async () => {
      try {
         if (validatePatientPermissionsForm(this.requestedPatient)) {
            await this.props.onRequestPatientPerms(this.requestedPatient)
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
                  <MDBIcon icon="briefcase-medical" /> Patient Permissions Querry
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <PatientPermissionsForm onInputChange={this.onInputChangeHandler}>
                  <div className="text-center">
                     <button className="btn btn-info" onClick={this.onRequestPatientPermsHandler}>
                        Request
                     </button>
                  </div>
               </PatientPermissionsForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}