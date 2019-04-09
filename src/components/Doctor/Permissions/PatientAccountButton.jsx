import React from 'react'
import { MDBBtn } from "mdbreact";

export class PatientAccountButton extends React.Component {

   onGetPatientBchainAccount = () => {
      
   }

   render() {
      return (
         <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onGetPatientBchainAccount}>
            <i className="fa fa-user-circle"></i>
         </MDBBtn>
      )
   }
}