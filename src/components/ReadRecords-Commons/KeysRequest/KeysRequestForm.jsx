import React from 'react'
import { MDBCard, MDBCardBody } from "mdbreact"
import { KeyInput } from "../../Utils/KeyInput"

export class KeysRequestForm extends React.Component {

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <React.Fragment>
                        <KeyInput
                           id="read-record-pswd"
                           keyName="password"
                           tooltip="Enter your password in order to view this record"
                           label="Password"
                           iconType="unlock-alt"
                           iconClass="teal-text"
                           onChange={this.props.onInputChange}
                        />
                        <center><p>or</p></center>
                        <KeyInput
                           id="read-record-enckey"
                           tooltip="Enter your encryption key in order to view this record"
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