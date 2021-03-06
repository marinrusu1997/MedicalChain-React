import React from 'react'
import { MDBInput, MDBTooltip } from 'mdbreact'
import { connect } from 'react-redux'
import RegistrationButton from '../RegistrationButton'
import { ReadInstrutionsCBox } from './ReadInstructionCBox'
import { NomenclatoryDropdown } from '../../Utils/NomenclatoryDropdown'
import {
   setDoctorName,
   setDoctorSurname,
   setDoctorSSN,
   setDoctorUniqueIdentificationCode,
   setDoctorDiplomaSeries,
   setDoctorSpecialistCertificateSeries,
   setDoctorAccountName,
   setDoctorSpecialtyId,
   setDoctorPassword,
   setReadedInstructions
} from '../../../store/Registration/Forms/Doctor/actions'
import { errorToast } from '../../Utils/Toasts';
import { PasswordInput } from '../../Utils/PasswordInput';

class MedicForm extends React.Component {

   constructor(props) {
      super(props)
      this.specialities = []
      if (this.props.specialitiesNomenclatory === null) {
         errorToast("Specialities nomenclatory wasn't loaded, please check for blockchain endpoint connection, refresh the page or go to previous page and try again")
      } else {
         this.reversedSpecialitiesNomenclatory = new Map()
         this.props.specialitiesNomenclatory.forEach((v, k) => this.reversedSpecialitiesNomenclatory.set(v, k))
         this.reversedSpecialitiesNomenclatory.forEach((id, specialty) => {
            this.specialities.push(specialty)
         })
      }
   }

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   changeHandler = event => {
      switch (event.target.name) {
         case 'name': {
            this.props.setDoctorName(event.target.value)
         }
            break;
         case 'surname': {
            this.props.setDoctorSurname(event.target.value)
         }
            break;
         case 'ssn': {
            this.props.setDoctorSSN(event.target.value)
         }
            break;
         case 'unique_identification_code': {
            this.props.setDoctorUniqueIdentificationCode(event.target.value)
         }
            break;
         case 'diploma_series': {
            this.props.setDoctorDiplomaSeries(event.target.value)
         }
            break;
         case 'specialist_physician_certificate_series': {
            this.props.setDoctorSpecialistCertificateSeries(event.target.value)
         }
            break;
         case 'account_name': {
            this.props.setDoctorAccountName(event.target.value)
         }
            break;
         case 'specialty-id': {
            this.props.setDoctorSpecialtyId(this.reversedSpecialitiesNomenclatory.get(event.target.value))
         }
            break;
         case 'password': {
            this.props.setDoctorPassword(event.target.value)
         }
            break;
         case 'readInstruction': {
            this.props.setReadedInstructions(event.target.checked)
         }
            break;
      }
   }

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
                  tooltipContent="Must contain exactly 13 digits">
                  <MDBInput
                     value={this.props.ssn}
                     name='ssn'
                     onChange={this.changeHandler}
                     required
                     className="white-text"
                     label="Your SSN"
                     icon="id-badge"
                     type="number"
                  />
               </MDBTooltip>
               <MDBTooltip
                  placement="bottom"
                  tooltipContent="10 digits taken from Membership Certificate of the College of Physicians from Romania">
                  <MDBInput
                     value={this.props.unique_identification_code}
                     name='unique_identification_code'
                     onChange={this.changeHandler}
                     required
                     className="white-text"
                     label="Your Unique Identification Code"
                     icon="id-badge"
                     type="number"
                  />
               </MDBTooltip>
               <MDBTooltip
                  placement="bottom"
                  tooltipContent="The letter of the series followed by the space and the serial number: H 0030179">
                  <MDBInput
                     value={this.props.diploma_series}
                     name='diploma_series'
                     onChange={this.changeHandler}
                     required
                     className="white-text"
                     label="The Diploma Series"
                     icon="file-alt"
                     type="text"
                  />
               </MDBTooltip>
               <MDBTooltip
                  placement="bottom"
                  tooltipContent="The letter of the series followed by the space and the serial number: S1 013398">
                  <MDBInput
                     value={this.props.specialist_physician_certificate_series}
                     name='specialist_physician_certificate_series'
                     onChange={this.changeHandler}
                     required
                     className="white-text"
                     label="The Specialist Physician Certificate"
                     icon="file-alt"
                     type="text"
                  />
               </MDBTooltip>
               <NomenclatoryDropdown
                  id="select-specialty-registration"
                  options={this.specialities}
                  placeholder="Choose specialty..."
                  icon={{ className: "", type: "book-reader" }}
                  onSelection={specialities => this.changeHandler({ target: { name: 'specialty-id', value: specialities[0] } })}
               />
               <MDBInput
                  value={this.props.account_name}
                  name='account_name'
                  onChange={this.changeHandler}
                  required
                  className="white-text"
                  label="Your Account Name"
                  icon="user-circle"
                  type="text"
               />
               <PasswordInput 
                  tooltip={"This password will be used in order to encrypt your private encryption key and store into wallet. Remember it!!!"}
                  password={this.props.password}
                  onChange={this.changeHandler}
               />
               <center>
                  <ReadInstrutionsCBox
                     checked={this.props.readInstruction}
                     input_name="readInstruction"
                     changeHandler={this.changeHandler}
                  />
               </center>
            </div>
            <RegistrationButton />
         </form>
      )
   }
}

const mapStateToProps = state => {
   return {
      name: state.registration.forms.doctor.name,
      surname: state.registration.forms.doctor.surname,
      ssn: state.registration.forms.doctor.ssn,
      unique_identification_code: state.registration.forms.doctor.unique_identification_code,
      diploma_series: state.registration.forms.doctor.diploma_series,
      specialist_physician_certificate_series: state.registration.forms.doctor.specialist_physician_certificate_series,
      account_name: state.registration.forms.doctor.account_name,
      readInstruction: state.registration.forms.doctor.readInstruction,
      specialitiesNomenclatory: state.blockchain.specialities,
      password: state.registration.forms.doctor.password
   }
}

const mapDispatchToProps = {
   setDoctorName,
   setDoctorSurname,
   setDoctorSSN,
   setDoctorUniqueIdentificationCode,
   setDoctorDiplomaSeries,
   setDoctorSpecialistCertificateSeries,
   setDoctorAccountName,
   setDoctorSpecialtyId,
   setDoctorPassword,
   setReadedInstructions
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicForm)