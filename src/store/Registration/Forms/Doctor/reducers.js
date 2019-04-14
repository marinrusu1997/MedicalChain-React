import {
   DOCTOR_NAME_CHANGED,
   DOCTOR_SURNAME_CHANGED,
   DOCTOR_SSN_CHANGED,
   DOCTOR_UNIQUE_IDENTIFICATION_CODE_CHANGED,
   DOCTOR_DIPLOMA_SERIES_CHANGED,
   DOCTOR_SPECIALIST_CERTIFICATE_SERIES_CHANGED,
   DOCTOR_ACCOUNT_NAME_CHANGED,
   DOCTOR_SPECIALTY_ID_CHANGED,
   DOCTOR_READ_INSTRUCTIONS_CHANGED,
   RESET_DOCTOR_REGISTRATION_FORM
} from './actions'

let defaultState = {
   name: '',
   surname: '',
   ssn: '',
   unique_identification_code: '',
   diploma_series: '',
   specialist_physician_certificate_series: '',
   account_name: '',
   specialty_id: -1,
   readInstruction: false
}

export const doctorFormReducer = (state = defaultState, action) => {
   switch (action.type) {
      case DOCTOR_NAME_CHANGED:
         return {
            ...state,
            name: action.payload
         }
      case DOCTOR_SURNAME_CHANGED:
         return {
            ...state,
            surname: action.payload
         }
      case DOCTOR_SSN_CHANGED:
         return {
            ...state,
            ssn: action.payload
         }
      case DOCTOR_UNIQUE_IDENTIFICATION_CODE_CHANGED:
         return {
            ...state,
            unique_identification_code: action.payload
         }
      case DOCTOR_DIPLOMA_SERIES_CHANGED:
         return {
            ...state,
            diploma_series: action.payload
         }
      case DOCTOR_SPECIALIST_CERTIFICATE_SERIES_CHANGED:
         return {
            ...state,
            specialist_physician_certificate_series: action.payload
         }
      case DOCTOR_ACCOUNT_NAME_CHANGED:
         return {
            ...state,
            account_name: action.payload
         }
      case DOCTOR_SPECIALTY_ID_CHANGED:
         return {
            ...state,
            specialty_id: action.payload
         }
      case DOCTOR_READ_INSTRUCTIONS_CHANGED:
         return {
            ...state,
            readInstruction: action.payload
         }
      case RESET_DOCTOR_REGISTRATION_FORM:
         return defaultState
      default:
         return state
   }
}