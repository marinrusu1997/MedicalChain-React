import React from 'react'
import { MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { NomenclatoryDropdown } from "../../../Utils/NomenclatoryDropdown";
import { FileInput } from '../../../Utils/FileInput';
import { KeyInput } from "../../../Utils/KeyInput";

export class AddRecordForm extends React.Component {

   constructor(props) {
      super(props)
      this.specialities = []
      props.specialitiesNomenclatory.forEach((id, specialty) => {
         this.specialities.push(specialty)
      })
   }

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   onNomenclatorySelection = specialties => this.props.onInputChange({ target: { name: 'speciality', value: specialties[0] } })

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
                     <NomenclatoryDropdown
                        id="add-record-specialties"
                        options={this.specialities}
                        multiple={false}
                        placeholder="Choose specialty..."
                        icon={{ className: "teal-text", type: "hospital-symbol" }}
                        onSelection={this.onNomenclatorySelection}
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
                        { /* <center><p>or</p></center> */}
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