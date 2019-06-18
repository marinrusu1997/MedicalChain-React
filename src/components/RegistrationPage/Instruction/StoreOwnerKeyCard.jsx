import React, { Component } from 'react';
import { MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBAlert } from "mdbreact";
import account_details from '../../../media/registration_patient/formatted/account_details.png'
import scatter_add_keys from '../../../media/registration_patient/formatted/scatter_add_keys.png'
import import_existing_key from '../../../media/registration_patient/formatted/import_existing_key.png'
import import_key_text from '../../../media/registration_patient/formatted/import_key_text.png'
import enter_text_key from '../../../media/registration_patient/formatted/enter_text_key.png'
import named_key from '../../../media/registration_patient/formatted/named_key.png'
import named_acc from '../../../media/registration_patient/formatted/named_acc.png'

export class StoreOwnerKeyCard extends Component {
   render() {
      return (
         <MDBContainer className="mt-5 text-center">
            <MDBRow>
               <MDBCol>
                  <center><font color="blue"><h3>Store Owner Key</h3></font></center>
                  <MDBJumbotron fluid>
                     <MDBAlert color="primary">
                        <p>Select and Copy your <strong>owner key</strong>(Ctrl+C)</p>
                     </MDBAlert>
                     <center>
                        <img src={account_details} alt="Account Details" />
                     </center>
                     <MDBAlert color="primary">
                        <p>Log into your Scatter wallet and press <strong>Add Keys</strong> button</p>
                     </MDBAlert>
                     <center>
                        <img src={scatter_add_keys} alt="Scatter Add Keys" />
                     </center>
                     <MDBAlert color="primary">
                        <p>In the opened page press <strong>Import Key</strong> button</p>
                     </MDBAlert>
                     <center>
                        <img src={import_existing_key} alt="Import Key" />
                     </center>
                     <MDBAlert color="primary">
                        <p>In the opened page press <strong>Text</strong> button which is under <i>Import private key as text</i></p>
                     </MDBAlert>
                     <center>
                        <img src={import_key_text} alt="Import Key" />
                     </center>
                     <MDBAlert color="primary">
                        <p>Paste (Ctrl+V) your key or enter it manually. If you paste the key, wallet will import it automatically, if not press <strong>Import</strong></p>
                     </MDBAlert>
                     <center>
                        <img src={enter_text_key} alt="Import Key" />
                     </center>
                     <MDBAlert color="primary">
                        <p>Name your key in a suggestive way, e.g. account name concatenated with <i>OwnerKey</i></p>
                     </MDBAlert>
                     <center>
                        <img src={named_key} alt="Import Key" />
                     </center>
                     <MDBAlert color="primary">
                        <p>Scatter will automatically link your key with your account. In case he fails, go to <i>Add Account</i> tab, enter it manually and press <strong>Add</strong> button</p>
                     </MDBAlert>
                     <center>
                        <img src={named_acc} alt="Import Key" />
                     </center>
                  </MDBJumbotron>
               </MDBCol>
            </MDBRow>
         </MDBContainer>
      )
   }
}