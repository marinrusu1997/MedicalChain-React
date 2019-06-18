import React from 'react'
import { MDBCard, MDBCardBody } from "mdbreact"
import { KeyInput } from "../../Utils/KeyInput"
import { CheckboxInput } from '../../Utils/CheckboxInput';

export class StoreKeysForm extends React.Component {

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   onInputChange = e => this.props.onInputChange({
      name: e.target.name,
      value: e.target.value
   })

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <React.Fragment>
                        <KeyInput
                           id="store-rec-key"
                           keyName="reckey"
                           label="Records Key"
                           iconType="key"
                           iconClass="teal-text"
                           onChange={this.onInputChange}
                        />
                        <KeyInput
                           id="store-enc-key"
                           keyName="enckey"
                           label="Encryption Key"
                           iconType="key"
                           iconClass="teal-text"
                           onChange={this.onInputChange}
                        />
                        <KeyInput
                           id="store-passwd"
                           keyName="password"
                           label="Password"
                           tooltip="Password is mandatory in order to encrypt your keys"
                           iconType="unlock-alt"
                           iconClass="teal-text"
                           onChange={this.onInputChange}
                        />
                        <center>
                           <CheckboxInput
                              id='keys-existence-check'
                              name='keys_existence_check'
                              label={<font color="black">Check if keys are stored already</font>}
                              onChange={e => this.props.onInputChange({
                                 name: e.target.name,
                                 value: e.target.checked
                              })}
                           />
                        </center>
                     </React.Fragment>
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}