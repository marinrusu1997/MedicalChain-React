import {
   PATIENT_NAME_CHANGED,
   PATIENT_SURNAME_CHANGED,
   PATIENT_GENDER_CHANGED,
   PATIENT_SSN_CHANGED,
   PATIENT_ID_CARD_NUMBER_CHANGED,
   PATIENT_BIRTHDAY_CHANGED,
   PATIENT_ACCOUNT_NAME_CHANGED,
   PATIENT_READ_INSTRUCTIONS_CHANGED,
   RESET_PATIENT_REGISTRATION_FORM
} from './actions'

let defaultState = {
   name: '',
   surname: '',
   gender: '',
   ssn: '',
   cardNumber: '',
   birthday: new Date().toJSON().slice(0, 10),
   accountName: '',
   readInstruction: false
}

export const patientFormReducer = (state = defaultState, action) => {
   switch (action.type) {
      case PATIENT_NAME_CHANGED:
         return {
            ...state,
            name: action.payload
         }
      case PATIENT_SURNAME_CHANGED:
         return {
            ...state,
            surname: action.payload
         }
      case PATIENT_GENDER_CHANGED:
         return {
            ...state,
            gender: action.payload
         }
      case PATIENT_SSN_CHANGED:
         return {
            ...state,
            ssn: action.payload
         }
      case PATIENT_ID_CARD_NUMBER_CHANGED:
         return {
            ...state,
            cardNumber: action.payload
         }
      case PATIENT_BIRTHDAY_CHANGED:
         return {
            ...state,
            birthday: action.payload
         }
      case PATIENT_ACCOUNT_NAME_CHANGED:
         return {
            ...state,
            accountName: action.payload
         }
      case PATIENT_READ_INSTRUCTIONS_CHANGED:
         return {
            ...state,
            readInstruction: action.payload
         }
      case RESET_PATIENT_REGISTRATION_FORM:
         return defaultState
      default:
         return state
   }
}