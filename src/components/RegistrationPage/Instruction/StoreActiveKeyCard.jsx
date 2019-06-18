import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBAlert } from "mdbreact";
import account_details_active from '../../../media/registration_patient/formatted/account_details_active.png'
import after_add_all_keys from '../../../media/registration_patient/formatted/after_add_all_keys.png'

export class StoreActiveKeyCard extends Component {
   render() {
      return (
         <MDBContainer className="mt-5 text-center">
            <MDBRow>
               <MDBCol>
                  <center><font color="blue"><h3>Store Active Key</h3></font></center>
                  <MDBJumbotron fluid>
                     <MDBAlert color="primary">
                        <p>Select and Copy your <strong>Active key</strong>(Ctrl+C) or you can enter it manualy</p>
                     </MDBAlert>
                     <center>
                        <img src={account_details_active} alt="Account Details" />
                     </center>
                     <MDBAlert color="primary">
                        <p>Following steps are the same as for Owner Key</p>
                     </MDBAlert>
                     <MDBAlert color="success">
                        <p>After importing both keys, you will be able to see them on Scatter main page</p>
                     </MDBAlert>
                     <center>
                        <img src={after_add_all_keys} alt="Account Details" />
                     </center>
                  </MDBJumbotron>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      )
   }
}