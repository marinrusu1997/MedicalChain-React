import React from 'react'
import { MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { FileInput } from '../../../Utils/FileInput';
import { KeyInput } from "../../../Utils/KeyInput";

export class AddRecordForm extends React.Component {
   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   onFileSelected = fileDetails => this.props.onInputChange({ target: { name: 'fileDetails', value: fileDetails } })

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <MDBInput
                        name='patient'
                        onChange={this.props.onInputChange}
                        label="Patient account"
                        iconClass="teal-text"
                        icon="user-tie"
                        type="text"
                        required
                     />
                     <FileInput
                        id="add-record-file-input"
                        fileExtensions=".xml"
                        icon={{ className: "teal-text", type: "file-medical" }}
                        onFileSelected={this.onFileSelected}
                     />
                     <MDBInput
                        name='description'
                        onChange={this.props.onInputChange}
                        label="Description"
                        iconClass="teal-text"
                        icon="comment-medical"
                        type="textarea"
                        rows="1"
                        required
                     />
                     <React.Fragment>
                        <KeyInput
                           id="add-record-pswd"
                           keyName="password"
                           tooltip="Enter your password in order to decrypt your private key stored in wallet"
                           label="Password"
                           iconType="unlock-alt"
                           iconClass="teal-text"
                           onChange={this.props.onInputChange}
                        />
                        <KeyInput
                           id="add-record-enckey"
                           tooltip="Enter your encryption key in order to have access to patient records key"
                           keyName="enckey"
                           label="Encryption Key"
                           iconType="key"
                           iconClass="teal-text"
                           onChange={this.props.onInputChange}
                        />
                     </React.Fragment>
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}