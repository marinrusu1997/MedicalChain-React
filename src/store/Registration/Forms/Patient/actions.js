export const PATIENT_NAME_CHANGED = 'PATIENT_NAME_CHANGED'
export const PATIENT_SURNAME_CHANGED = 'PATIENT_SURNAME_CHANGED'
export const PATIENT_GENDER_CHANGED = 'PATIENT_GENDER_CHANGED'
export const PATIENT_SSN_CHANGED = 'PATIENT_SSN_CHANGED'
export const PATIENT_ID_CARD_NUMBER_CHANGED = 'PATIENT_ID_CARD_NUMBER_CHANGED'
export const PATIENT_BIRTHDAY_CHANGED = 'PATIENT_BIRTHDAY_CHANGED'
export const PATIENT_ACCOUNT_NAME_CHANGED = 'PATIENT_ACCOUNT_NAME_CHANGED'
export const PATIENT_READ_INSTRUCTIONS_CHANGED = 'PATIENT_READ_INSTRUCTIONS_CHANGED'
export const RESET_PATIENT_REGISTRATION_FORM = 'RESET_PATIENT_REGISTRATION_FORM'

export const setPatientName = name => {
   return {
      type: PATIENT_NAME_CHANGED,
      payload: name
   }
}

export const setPatientSurname = surname => {
   return {
      type: PATIENT_SURNAME_CHANGED,
      payload: surname
   }
}

export const setPatientGender = gender => {
   return {
      type: PATIENT_GENDER_CHANGED,
      payload: gender
   }
}

export const setPatientSSN = ssn => {
   return {
      type: PATIENT_SSN_CHANGED,
      payload: ssn
   }
}

export const setPatientIdCardNumber = number => {
   return {
      type: PATIENT_ID_CARD_NUMBER_CHANGED,
      payload: number
   }
}

export const setPatientBirthday = bday => {
   return {
      type: PATIENT_BIRTHDAY_CHANGED,
      payload: bday
   }
}

export const setPatientAccountName = account => {
   return {
      type: PATIENT_ACCOUNT_NAME_CHANGED,
      payload: account
   }
}

export const setReadedInstructions = hasReaded => {
   return {
      type: PATIENT_READ_INSTRUCTIONS_CHANGED,
      payload: hasReaded
   }
}

export const resetPatientRegistrationForm = () => {
   return {
      type: RESET_PATIENT_REGISTRATION_FORM
   }
}