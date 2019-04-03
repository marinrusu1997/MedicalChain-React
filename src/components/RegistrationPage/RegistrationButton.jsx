import React from "react"
import { connect } from 'react-redux'
import { isPatientFormValid } from '../RegistrationPage/Forms/Validators/PatientFormValidator'
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
import { tryCreateAccount } from '../../blockchain/eosio-client'
import { errorToast } from '../Utils/Toasts'
import { ObjectDecorator } from '../../utils/ObjectDecorator'

class RegistrationButton extends React.Component {

   handleRegister = async registrationInfo => {
      this.props.accountCreationRequestSent()
      tryCreateAccount(registrationInfo, this.props.currentUserType, creation => {
         this.props.accountCreationResponseReady()
         if (!creation.isSuccessfull) {
            errorToast(creation.msg)
         } else {
            this.props.accountCreatedSuccessfullyAction(creation.accountDetails)
         }
      })
   }

   getNormalizedPatientRegistrationInfo = () => {
      return {
         name: this.props.patient.name.trim(),
         surname: this.props.patient.surname.trim(),
         gender: this.props.patient.gender.charAt(0),
         ssn: this.props.patient.ssn.trim(),
         cardNumber: this.props.patient.cardNumber.trim(),
         birthday: this.props.patient.birthday,
         accountName: this.props.patient.accountName.trim(),
         readInstruction: this.props.patient.readInstruction
      }
   }

   clickHandler = () => {
      switch (this.props.currentUserType) {
         case USER_TYPE_PATIENT: {
            let patientForm = this.getNormalizedPatientRegistrationInfo()
            if (isPatientFormValid(patientForm)) {
               this.handleRegister(ObjectDecorator.removeProperty(patientForm, 'readInstruction'))
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
      patient: state.registration.forms.patient
   }
}

const mapDispatchToProps = {
   accountCreatedSuccessfullyAction,
   accountCreationRequestSent,
   accountCreationResponseReady
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationButton)