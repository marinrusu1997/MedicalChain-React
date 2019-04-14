import React from 'react'
import { MDBBtn } from "mdbreact";
import { PatientAccountFromFullNameModal } from './PatientAccountFromFNameModal';

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
      
      return Promise.resolve([{
         account: "rusu",
         birthday: '1997-08-19'
      },{
         account: "ioda",
         birthday: "azaaa"
      }])
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