import React from 'react'
import { MDBInput, MDBTooltip } from 'mdbreact'
import { connect } from 'react-redux'
import RegistrationButton from '../RegistrationButton'
import { ReadInstrutionsCBox } from './ReadInstructionCBox'
import {
   setDoctorName,
   setDoctorSurname,
   setDoctorSSN,
   setDoctorUniqueIdentificationCode,
   setDoctorDiplomaSeries,
   setDoctorSpecialistCertificateSeries,
   setDoctorAccountName,
   setReadedInstructions
} from '../../../store/Registration/Forms/Doctor/actions'

class MedicForm extends React.Component {

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
               <ReadInstrutionsCBox
                  input_name="readInstruction"
                  changeHandler={this.changeHandler}
               />
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
      readInstruction: state.registration.forms.doctor.readInstruction
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
   setReadedInstructions
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicForm)