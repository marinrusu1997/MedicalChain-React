import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBAlert } from "mdbreact";
import backup_keys from '../../../media/registration_patient/formatted/backup_keys.png'

export class BackUpKeysCard extends Component {
   render() {
      return (
         <MDBContainer className="mt-5 text-center">
            <MDBRow>
               <MDBCol>
                  <center><font color="blue"><h3>Backup Keys</h3></font></center>
                  <MDBJumbotron fluid>
                     <MDBAlert color="primary">
                        <p>
                           After registration, application stores your <i>Records</i> and <i>Encryption</i> keys into wallet automatically. 
                           It is highly recommended to store them in another place for back up. Also, if application will encounter an error, you 
                           will need to store them manually into wallet from application main page
                        </p>
                     </MDBAlert>
                     <center>
                        <img src={backup_keys} alt="Account Details" />
                     </center>
                     <MDBAlert color="primary">
                        <p>
                           Press <strong>COPY</strong> button and paste keys in the place you want to store them
                        </p>
                     </MDBAlert>
                  </MDBJumbotron>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      )
   }
}