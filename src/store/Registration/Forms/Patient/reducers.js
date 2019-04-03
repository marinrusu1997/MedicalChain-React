import {
   NAME_CHANGED,
   SURNAME_CHANGED,
   GENDER_CHANGED,
   SSN_CHANGED,
   ID_CARD_NUMBER_CHANGED,
   BIRTHDAY_CHANGED,
   ACCOUNT_NAME_CHANGED,
   READ_INSTRUCTIONS_CHANGED,
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
      case NAME_CHANGED:
         return {
            ...state,
            name: action.payload
         }
      case SURNAME_CHANGED:
         return {
            ...state,
            surname: action.payload
         }
      case GENDER_CHANGED:
         return {
            ...state,
            gender: action.payload
         }
      case SSN_CHANGED:
         return {
            ...state,
            ssn: action.payload
         }
      case ID_CARD_NUMBER_CHANGED:
         return {
            ...state,
            cardNumber: action.payload
         }
      case BIRTHDAY_CHANGED:
         return {
            ...state,
            birthday: action.payload
         }
      case ACCOUNT_NAME_CHANGED:
         return {
            ...state,
            accountName: action.payload
         }
      case READ_INSTRUCTIONS_CHANGED:
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