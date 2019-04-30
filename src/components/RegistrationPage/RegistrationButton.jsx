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
import { errorToast, succToast } from '../Utils/Toasts'
import { ObjectDecorator } from '../../utils/ObjectDecorator'
import { resetDoctorRegistrationForm } from '../../store/Registration/Forms/Doctor/actions'
import { resetPatientRegistrationForm } from '../../store/Registration/Forms/Patient/actions'

import { Crypto } from "../../blockchain/eosio-crypto"
import { storeEncryptionKey, storeRecordsKey } from "../../servers/wallet";

class RegistrationButton extends React.Component {

   storeKeysIntoNodeWallet = async (password, keys, account) => {
      let success = false
      try {
         if (!!!(await storeEncryptionKey(account, Crypto.encryptAESWithPassword(keys.encryption, password)))) {
            throw new Error('Failed to store encryption key into wallet')
         }
         if (keys.records) {
            if (!!!(await storeRecordsKey(account, Crypto.encryptAESWithPassword(keys.records, password)))) {
               throw new Error('Failed to store records key into wallet')
            }
         }
         success = true
      } catch (e) {
         console.error(e)
      }
      return Promise.resolve(success)
   }

   handlePatientRegistration = registrationInfo => {
      this.props.accountCreationRequestSent()
      const password = registrationInfo.password
      tryCreatePatientAccount(registrationInfo, async creation => {
         this.props.accountCreationResponseReady()
         if (!!!creation.isSuccessfull) {
            errorToast(creation.msg)
         } else {
            if (!!!(await this.storeKeysIntoNodeWallet(password, creation.accountDetails.keys, creation.accountDetails.name))) {
               errorToast('Failed to store your encryption/records key into wallet, you must store them manually from your home page')
            } else {
               succToast('Your encryption/records were stored successfully into wallet')
            }
            this.props.accountCreatedSuccessfullyAction(creation.accountDetails)
            this.props.resetPatientRegistrationForm()
         }
      })
   }

   handleDoctorRegistration = registrationInfo => {
      this.props.accountCreationRequestSent()
      const password = registrationInfo.password
      tryCreateDoctorAccount(registrationInfo, async creation => {
         this.props.accountCreationResponseReady()
         if (!!!creation.isSuccessfull) {
            errorToast(creation.msg)
         } else {
            if (!!!(await this.storeKeysIntoNodeWallet(password, creation.accountDetails.keys, creation.accountDetails.name))) {
               errorToast('Failed to store your encryption/records key into wallet, you must store them manually from your home page')
            } else {
               succToast('Your encryption/records were stored successfully into wallet')
            }
            this.props.accountCreatedSuccessfullyAction(creation.accountDetails)
            this.props.resetDoctorRegistrationForm()
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
      password: this.props.patient.password.trim(),
      readInstruction: this.props.patient.readInstruction
   })

   getNormalizedDoctorRegistrationInfo = () => ({
      name: this.props.doctor.name.trim(),
      surname: this.props.doctor.surname.trim(),
      ssn: this.props.doctor.ssn.trim(),
      unique_identification_code: this.props.doctor.unique_identification_code.trim(),
      diploma_series: this.props.doctor.diploma_series.trim(),
      specialist_physician_certificate_series: this.props.doctor.specialist_physician_certificate_series.trim(),
      accountName: this.props.doctor.account_name.trim(),
      specialty_id: this.props.doctor.specialty_id,
      password: this.props.doctor.password.trim(),
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
         default:
            errorToast('Invalid user type ' + this.props.currentUserType)
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
   accountCreationResponseReady,
   resetPatientRegistrationForm,
   resetDoctorRegistrationForm
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationButton)