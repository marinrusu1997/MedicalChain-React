export const DOCTOR_NAME_CHANGED = 'DOCTOR_NAME_CHANGED'
export const DOCTOR_SURNAME_CHANGED = 'DOCTOR_SURNAME_CHANGED'
export const DOCTOR_SSN_CHANGED = 'DOCTOR_SSN_CHANGED'
export const DOCTOR_UNIQUE_IDENTIFICATION_CODE_CHANGED = 'DOCTOR_UNIQUE_IDENTIFICATION_CODE_CHANGED'
export const DOCTOR_DIPLOMA_SERIES_CHANGED = 'DOCTOR_DIPLOMA_SERIES_CHANGED'
export const DOCTOR_SPECIALIST_CERTIFICATE_SERIES_CHANGED = 'DOCTOR_SPECIALIST_CERTIFICATE_SERIES_CHANGED'
export const DOCTOR_ACCOUNT_NAME_CHANGED = 'DOCTOR_ACCOUNT_NAME_CHANGED'
export const DOCTOR_SPECIALTY_ID_CHANGED = 'DOCTOR_SPECIALTY_ID_CHANGED'
export const DOCTOR_PASSWORD_CHANGED = 'DOCTOR_PASSWORD_CHANGED'
export const DOCTOR_READ_INSTRUCTIONS_CHANGED = 'DOCTOR_READ_INSTRUCTIONS_CHANGED'
export const RESET_DOCTOR_REGISTRATION_FORM = 'RESET_DOCTOR_REGISTRATION_FORM'

export const setDoctorName = name => {
   return {
      type: DOCTOR_NAME_CHANGED,
      payload: name
   }
}

export const setDoctorSurname = surname => {
   return {
      type: DOCTOR_SURNAME_CHANGED,
      payload: surname
   }
}

export const setDoctorSSN = ssn => {
   return {
      type: DOCTOR_SSN_CHANGED,
      payload: ssn
   }
}

export const setDoctorUniqueIdentificationCode = uniqe_identification_code => {
   return {
      type: DOCTOR_UNIQUE_IDENTIFICATION_CODE_CHANGED,
      payload: uniqe_identification_code
   }
}

export const setDoctorDiplomaSeries = series => {
   return {
      type: DOCTOR_DIPLOMA_SERIES_CHANGED,
      payload: series
   }
}

export const setDoctorSpecialistCertificateSeries = series => {
   return {
      type: DOCTOR_SPECIALIST_CERTIFICATE_SERIES_CHANGED,
      payload: series
   }
}

export const setDoctorAccountName = account => ({
   type: DOCTOR_ACCOUNT_NAME_CHANGED,
   payload: account
})

export const setDoctorSpecialtyId = specialty_id => ({
   type: DOCTOR_SPECIALTY_ID_CHANGED,
   payload: specialty_id
})

export const setDoctorPassword = password => ({
   type: DOCTOR_PASSWORD_CHANGED,
   payload: password
})

export const setReadedInstructions = hasReaded => {
   return {
      type: DOCTOR_READ_INSTRUCTIONS_CHANGED,
      payload: hasReaded
   }
}

export const resetDoctorRegistrationForm = () => {
   return {
      type: RESET_DOCTOR_REGISTRATION_FORM
   }
}