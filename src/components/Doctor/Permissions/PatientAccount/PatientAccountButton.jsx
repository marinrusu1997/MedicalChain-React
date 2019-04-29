import React from 'react'
import { MDBBtn } from "mdbreact";
import { PatientAccountFromFullNameModal } from './PatientAccountFromFNameModal';
import { getPatientAccountsFromFullName } from "../../../../servers/identification";
import { errorToast } from "../../../Utils/Toasts";

export class PatientAccountButton extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   onGetPatientBchainAccount = () => {
      this.onModalTogle()
   }

   onModalTogle = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   onRequestForPatientAccount = async full_name => {
      let patientAccountsArr = await getPatientAccountsFromFullName(full_name)
      if (!!!patientAccountsArr) {
         errorToast("Can't connect to server")
         patientAccountsArr = []
      } else if (patientAccountsArr.length === 0) {
         errorToast('Patients with this name and surname were not registered yet')
      }
      return patientAccountsArr
   }

   render() {
      return (
         <React.Fragment>
            <PatientAccountFromFullNameModal
               isOpen={this.state.modal.isOpen}
               toggle={this.onModalTogle}
               onRequestForPatientAccount={this.onRequestForPatientAccount}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onGetPatientBchainAccount}>
               <i className="fa fa-user-circle"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}