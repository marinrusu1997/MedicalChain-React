import React from 'react'
import { MDBCard, MDBCardBody, MDBInput } from 'mdbreact'
import Toggle from 'react-bootstrap-toggle'

import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css'
import { IntervalInput } from '../../Permission-Commons/IntervalInput';
import { NomenclatoryDropdown } from '../../Utils/NomenclatoryDropdown';
import { KeyInput } from '../../Utils/KeyInput';

export class AddPermForm extends React.Component {
   constructor(props) {
      super(props)
      this.rights = []
      props.permNomenclatories.rightsNomenclatory.forEach((id, right) => {
         this.rights.push(right)
      })
      this.specialities = []
      props.permNomenclatories.specialitiesNomenclatory.forEach((id, specialty) => {
         this.specialities.push(specialty)
      })
      this.state = {
         isKeyToggleActive: true
      }
   }

   onKeyToggle = () => {
      this.setState({ isKeyToggleActive: !!!this.state.isKeyToggleActive })
   }

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
                     <MDBInput
                        name='doctor'
                        onChange={this.props.onInputChange}
                        label="Doctor account"
                        iconClass="teal-text"
                        icon="user-md"
                        type="text"
                        required
                     />
                     <IntervalInput onInputChange={this.props.onInputChange} />
                     <NomenclatoryDropdown
                        id="add-rights"
                        options={this.rights}
                        placeholder="Choose right..."
                        icon={{ className: "teal-text", type: "book-reader" }}
                        onSelection={rights => this.props.onInputChange({ target: { name: 'right', value: rights[0] } })}
                     />
                     <NomenclatoryDropdown
                        id="add-specialties"
                        options={this.specialities}
                        multiple={true}
                        placeholder="Choose specialty..."
                        icon={{ className: "teal-text", type: "hospital-symbol" }}
                        onSelection={specialties => this.props.onInputChange({ target: { name: 'specialties', value: specialties } })}
                     />
                     <center style={{ margin: '20px 20px' }}>
                        <Toggle
                           data-attr-best="Take That"
                           active={this.state.isKeyToggleActive}
                           onstyle="success"
                           offstyle="danger"
                           onClick={this.onKeyToggle}
                           on={<b>KEYS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>}
                           off={<b>&nbsp;NO&nbsp;KEYS</b>}
                           recalculateOnResize={true}
                        />
                     </center>
                     {
                        this.state.isKeyToggleActive &&
                        <React.Fragment>
                           <center>
                              <font color="black">
                                 {"One of the following fields needs to be filled only once, when you are adding your first permission for specified doctor"}
                              </font>
                           </center>
                           <KeyInput
                              id="password-input"
                              tooltip="Enter your password in order to decrypt your keys from wallet"
                              keyName="password"
                              label="Password"
                              iconType="unlock-alt"
                              iconClass="teal-text"
                              onChange={this.props.onInputChange}
                           />
                           <center><p>or</p></center>
                           <KeyInput
                              id="decreckey-input"
                              tooltip="Enter your private records encryption key"
                              keyName="decreckey"
                              label="Records Key"
                              iconType="key"
                              iconClass="teal-text"
                              onChange={this.props.onInputChange}
                           />
                           <KeyInput
                              id="enckey-input"
                              tooltip="Enter your encryption key in order to sign your records key"
                              keyName="enckey"
                              label="Encryption Key"
                              iconType="key"
                              iconClass="teal-text"
                              onChange={this.props.onInputChange}
                           />
                        </React.Fragment>
                     }
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}