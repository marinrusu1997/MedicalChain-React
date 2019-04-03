export const NAME_CHANGED = 'NAME_CHANGED'
export const SURNAME_CHANGED = 'SURNAME_CHANGED'
export const GENDER_CHANGED = 'GENDER_CHANGED'
export const SSN_CHANGED = 'SSN_CHANGED'
export const ID_CARD_NUMBER_CHANGED = 'ID_CARD_NUMBER_CHANGED'
export const BIRTHDAY_CHANGED = 'BIRTHDAY_CHANGED'
export const ACCOUNT_NAME_CHANGED = 'ACCOUNT_NAME_CHANGED'
export const READ_INSTRUCTIONS_CHANGED = 'READ_INSTRUCTIONS_CHANGED'
export const RESET_PATIENT_REGISTRATION_FORM = 'RESET_PATIENT_REGISTRATION_FORM'

export const setPatientName = name => {
   return {
      type: NAME_CHANGED,
      payload: name
   }
}

export const setPatientSurname = surname => {
   return {
      type: SURNAME_CHANGED,
      payload: surname
   }
}

export const setPatientGender = gender => {
   return {
      type: GENDER_CHANGED,
      payload: gender
   }
}

export const setPatientSSN = ssn => {
   return {
      type: SSN_CHANGED,
      payload: ssn
   }
}

export const setPatientIdCardNumber = number => {
   return {
      type: ID_CARD_NUMBER_CHANGED,
      payload: number
   }
}

export const setPatientBirthday = bday => {
   return {
      type: BIRTHDAY_CHANGED,
      payload: bday
   }
}

export const setPatientAccountName = account => {
   return {
      type: ACCOUNT_NAME_CHANGED,
      payload: account
   }
}

export const setReadedInstructions = hasReaded => {
   return {
      type: READ_INSTRUCTIONS_CHANGED,
      payload: hasReaded
   }
}

export const resetPatientRegistrationForm = () => {
   return {
      type: 'RESET_PATIENT_REGISTRATION_FORM'
   }
}