import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBAlert } from "mdbreact";
import form from '../../../media/registration_patient/formatted/formular.png'

export class FillFormCard extends Component {
   render() {
      return (
         <MDBContainer className="mt-5 text-center">
            <MDBRow>
               <MDBCol>
                  <center><font color="blue"><h3>Fill the form</h3></font></center>
                  <MDBJumbotron fluid>
                     <center>
                        <img src={form} alt="Form" />
                     </center>
                     <MDBAlert color="danger">
                        Remember your password
                     </MDBAlert>
                     <MDBAlert color="primary">
                        <p>Press <strong>REGISTER</strong> button</p>
                     </MDBAlert>
                  </MDBJumbotron>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      )
   }
}