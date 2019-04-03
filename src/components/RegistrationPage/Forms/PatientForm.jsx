import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { MDBInput, MDBTooltip } from 'mdbreact'
import RegistrationButton from '../RegistrationButton'
import {
   setPatientName,
   setPatientSurname,
   setPatientGender,
   setPatientSSN,
   setPatientIdCardNumber,
   setPatientBirthday,
   setPatientAccountName,
   setReadedInstructions
} from '../../../store/Registration/Forms/Patient/actions'

class PatientForm extends React.Component {
   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   changeHandler = event => {
      switch(event.target.name) {
         case 'name': {
            this.props.setPatientName(event.target.value)
         }
         break;
         case 'surname':{
            this.props.setPatientSurname(event.target.value)
         }
         break;
         case 'gender':{
            this.props.setPatientGender(event.target.value)
         }
         break;
         case 'ssn': {
            this.props.setPatientSSN(event.target.value)
         }
         break;
         case 'cardNumber': {
            this.props.setPatientIdCardNumber(event.target.value)
         }
         break;
         case 'birthday': {
            this.props.setPatientBirthday(event.target.value)
         }
         break;
         case 'accountName': {
            this.props.setPatientAccountName(event.target.value)
         }
         break;
         case 'readInstruction': {
            this.props.setReadedInstructions(event.target.checked)
         }
         break;
      }
   }

   makeInputInvalid = input => input.className = 'form-control is-invalid'

   render() {
      return (
         <form className="needs-validation" onSubmit={this.submitHandler} autoComplete="off" noValidate >
            <div className="grey-text">
               <MDBInput
                  value={this.props.surname}
                  name='surname'
                  onChange={this.changeHandler}
                  required
                  className="white-text"
                  label="Your Surname"
                  icon="user"
                  type="text"
               />
               <MDBInput
                  id='fullNameRegistrationInput'
                  value={this.props.name}
                  name='name'
                  onChange={this.changeHandler}
                  required
                  className="white-text"
                  label="Your Name"
                  icon="user"
                  type="text"
               />
               <MDBTooltip
                  placement="bottom"
                  tooltipContent="Valid values are M/F">
                  <MDBInput
                     value={this.props.gender}
                     name='gender'
                     onChange={this.changeHandler}
                     required
                     className="white-text"
                     label="Your Gender"
                     icon="venus-mars"
                     type="text"
                  />
               </MDBTooltip>
               <MDBTooltip
                  placement="bottom"
                  tooltipContent="Must contain exactly 13 numbers">
                  <MDBInput
                     value={this.props.ssn}
                     name='ssn'
                     onChange={this.changeHandler}
                     required
                     className="white-text"
                     label="Your SSN"
                     icon="id-badge"
                     type="text"
                  />
               </MDBTooltip>
               <MDBInput
                  value={this.props.cardNumber}
                  name='cardNumber'
                  onChange={this.changeHandler}
                  required
                  className="white-text"
                  label="Your ID card number"
                  icon="address-card"
                  type="text"
               />
               <MDBInput
                  value={this.props.birthday}
                  name='birthday'
                  onChange={this.changeHandler}
                  required
                  className="white-text"
                  label="Your Birthday"
                  icon="calendar-alt"
                  type="date"
               />
               <MDBInput
                  value={this.props.accountName}
                  name='accountName'
                  onChange={this.changeHandler}
                  required
                  className="white-text"
                  label="Your Account Name"
                  icon="user-circle"
                  type="text"
               />
               <div className="custom-control custom-checkbox pl-3">
                  <input
                     name='readInstruction'
                     onChange={this.changeHandler}
                     required
                     className="custom-control-input"
                     type="checkbox"
                     id="instruction"
                  />
                  <label className="custom-control-label" htmlFor="instruction">
                     I read the instruction for registration
                  </label>
                  <div className="invalid-feedback">
                     You must read the instruction before registering.
                  </div>
               </div>
            </div>
            <RegistrationButton />
         </form>
      )
   }
}

const mapStateToProps = state => {
   return {
      name: state.registration.forms.patient.name,
      surname: state.registration.forms.patient.surname,
      gender: state.registration.forms.patient.gender,
      ssn: state.registration.forms.patient.ssn,
      cardNumber: state.registration.forms.patient.cardNumber,
      birthday: state.registration.forms.patient.birthday,
      accountName: state.registration.forms.patient.accountName,
      readInstruction: state.registration.forms.patient.readInstruction
   }
}

const mapDispatchToProps = {
   setPatientName,
   setPatientSurname,
   setPatientGender,
   setPatientSSN,
   setPatientIdCardNumber,
   setPatientBirthday,
   setPatientAccountName,
   setReadedInstructions
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PatientForm))