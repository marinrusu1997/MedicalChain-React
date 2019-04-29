import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon, MDBModalFooter } from "mdbreact";
import { PatientAccountFormFullNameForm } from './PatientAccountFromFNameForm';
import { isPatientFullNameValid } from "./PatientFullNameValidator";
import { PatientAccountCollapse } from './PatientAccountCollapse';

export class PatientAccountFromFullNameModal extends React.Component {
   constructor(props) {
      super(props)
      this.patientFullName = null
      this.__resetPatientFullName()
      this.state = {
         isCollapsed: false,
         accounts: []
      }
   }

   __resetPatientFullName = () => {
      this.patientFullName = {
         name: '',
         surname: ''
      }
   }

   __getNormalizedPatientFullName = () => ({
      name: this.patientFullName.name.toUpperCase().trim(),
      surname: this.patientFullName.surname.toUpperCase().trim()
   })

   handleTogle = () => {
      this.__resetPatientFullName()
      this.props.toggle()
   }

   collapse = () => {
      this.setState({ isCollapsed: !!!this.state.isCollapsed })
   }

   onInputChange = event => {
      this.patientFullName[event.target.name] = event.target.value
   }

   onRequestForPatientAccount = async () => {
      if (isPatientFullNameValid(this.patientFullName)) {
         this.setState({ accounts: await this.props.onRequestForPatientAccount(this.__getNormalizedPatientFullName()) })
      }
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
            <MDBModalHeader
               toggle={this.handleTogle}
               titleClass="d-inline title"
               className="text-center gradient-card-header blue-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="file-contract" /> Patient Account
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <PatientAccountFormFullNameForm
                  onInputChange={this.onInputChange}
               >
                  <div className="text-center">
                     <button className="btn btn-info" onClick={this.onRequestForPatientAccount}>
                        Request
                     </button>
                  </div>
               </PatientAccountFormFullNameForm>
               {
                  this.state.accounts.length !== 0 &&
                  <PatientAccountCollapse
                     isCollapsed={this.state.isCollapsed}
                     onCollapse={this.collapse}
                     accounts={this.state.accounts}
                  />
               }
            </MDBModalBody>
         </MDBModal>
      )
   }
}