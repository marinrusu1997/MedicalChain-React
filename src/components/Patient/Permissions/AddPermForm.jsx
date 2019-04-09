import React from 'react'
import { MDBCard, MDBCardBody, MDBInput } from 'mdbreact'

import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css'
import { IntervalInput } from '../../Permission-Commons/IntervalInput';
import { NomenclatoryDropdown } from '../../Utils/NomenclatoryDropdown';

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
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}