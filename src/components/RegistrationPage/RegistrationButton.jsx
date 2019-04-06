import React from "react"
import { connect } from 'react-redux'
import { isPatientFormValid } from '../RegistrationPage/Forms/Validators/PatientFormValidator'
import { isDoctorFormValid } from '../RegistrationPage/Forms/Validators/DoctorFormValidator'
import {
   USER_TYPE_PATIENT,
   USER_TYPE_MEDIC,
   USER_TYPE_RESEARCHER
} from '../../store/App/actions'
import {
   accountCreationRequestSent,
   accountCreationResponseReady
} from '../../store/Registration/Sign Up Header/actions'
import { accountCreatedSuccessfullyAction } from '../../store/Registration/Account Display/actions'
import '../../css/buttons.css'
import { tryCreatePatientAccount, tryCreateDoctorAccount } from '../../blockchain/eosio-client'
import { errorToast } from '../Utils/Toasts'
import { ObjectDecorator } from '../../utils/ObjectDecorator'

class RegistrationButton extends React.Component {

   handlePatientRegistration = async registrationInfo => {
      this.props.accountCreationRequestSent()
      tryCreatePatientAccount(registrationInfo, creation => {
         this.props.accountCreationResponseReady()
         if (!!!creation.isSuccessfull) {
            errorToast(creation.msg)
         } else {
            this.props.accountCreatedSuccessfullyAction(creation.accountDetails)
         }
      })
   }

   handleDoctorRegistration = async registrationInfo => {
      this.props.accountCreationRequestSent()
      tryCreateDoctorAccount(registrationInfo, creation => {
         this.props.accountCreationResponseReady()
         if (!!!creation.isSuccessfull) {
            errorToast(creation.msg)
         } else {
            this.props.accountCreatedSuccessfullyAction(creation.accountDetails)
         }
      })
   }

   getNormalizedPatientRegistrationInfo = () => ({
      name: this.props.patient.name.trim(),
      surname: this.props.patient.surname.trim(),
      gender: this.props.patient.gender.charAt(0),
      ssn: this.props.patient.ssn.trim(),
      cardNumber: this.props.patient.cardNumber.trim(),
      birthday: this.props.patient.birthday,
      accountName: this.props.patient.accountName.trim(),
      readInstruction: this.props.patient.readInstruction
   })

   getNormalizedDoctorRegistrationInfo = () => ({
      name: this.props.doctor.name.trim(),
      surname: this.props.doctor.surname.trim(),
      ssn: this.props.doctor.ssn.trim(),
      unique_identification_code: this.props.doctor.unique_identification_code.trim(),
      diploma_series: this.props.doctor.diploma_series.trim(),
      specialist_physician_certificate_series: this.props.doctor.specialist_physician_certificate_series.trim(),
      account_name: this.props.doctor.account_name,
      readInstruction: this.props.doctor.readInstruction
   })

   clickHandler = () => {
      switch (this.props.currentUserType) {
         case USER_TYPE_PATIENT: {
            let patientForm = this.getNormalizedPatientRegistrationInfo()
            if (isPatientFormValid(patientForm)) {
               this.handlePatientRegistration(ObjectDecorator.removeProperty(patientForm, 'readInstruction'))
            }
         }
            break;
         case USER_TYPE_MEDIC: {
            let doctorForm = this.getNormalizedDoctorRegistrationInfo()
            if (isDoctorFormValid(doctorForm)) {
               this.handleDoctorRegistration(ObjectDecorator.removeProperty(doctorForm, 'readInstruction'))
            }
         }
            break;
      }
   }

   render() {
      return (
         <div className="text-center">
            <button className="btn btn-transparent" onClick={this.clickHandler}>
               Register
            </button>
         </div>
      )
   }
}

const mapStateToProps = state => {
   return {
      currentUserType: state.app.currentUserType,
      patient: state.registration.forms.patient,
      doctor: state.registration.forms.doctor
   }
}

const mapDispatchToProps = {
   accountCreatedSuccessfullyAction,
   accountCreationRequestSent,
   accountCreationResponseReady
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationButton)