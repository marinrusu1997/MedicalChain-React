import { errorToast } from '../../../Utils/Toasts'

const isNameValid = name => {
   if (name.length <= 2) {
      errorToast('Name must contain at least 3 characters')
      return false
   }
   if (!!!(name.charAt(0) >= 'A' && name.charAt(0) <= 'Z')) {
      errorToast('Name must begin with uppercase letter')
      return false
   }
   if (!!!name.match(/^[a-zA-Z]+$/)) {
      errorToast('Name must contain only letters')
      return false
   }
   return true
}

const isSurnameValid = surname => {
   if (surname.length <= 2) {
      errorToast('Surname must contain at least 3 characters')
      return false
   }
   if (!!!(surname.charAt(0) >= 'A' && surname.charAt(0) <= 'Z')) {
      errorToast('Surname must begin with uppercase letter')
      return false
   }
   if (!!!surname.match(/^[a-zA-Z]+$/)) {
      errorToast('Surname must contain only letters')
      return false
   }
   return true
}

const doSsnValidation = ssn => {
   let i = 0, year = 0, hashResult = 0, cnp = [], hashTable = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
   if (ssn.length !== 13) { return false; }
   for (i = 0; i < 13; i++) {
      cnp[i] = parseInt(ssn.charAt(i), 10);
      if (isNaN(cnp[i])) { return false; }
      if (i < 12) { hashResult = hashResult + (cnp[i] * hashTable[i]); }
   }
   hashResult = hashResult % 11;
   if (hashResult === 10) { hashResult = 1; }
   year = (cnp[1] * 10) + cnp[2];
   switch (cnp[0]) {
      case 1: case 2: { year += 1900; } break;
      case 3: case 4: { year += 1800; } break;
      case 5: case 6: { year += 2000; } break;
      case 7: case 8: case 9: { year += 2000; if (year > (parseInt(new Date().getYear(), 10) - 14)) { year -= 100; } } break;
      default: { return false; }
   }
   if (year < 1800 || year > 2099) { return false; }
   return (cnp[12] === hashResult);
}

const isSsnValid = ssn => {
   let res = doSsnValidation(ssn)
   if (!!!res) {
      errorToast('SSN must contain 13 valid digits')
   }
   return res
}

const isUniqueIdentificationCodeValid = code => {
   if (code.length !== 10) {
      errorToast('Unique Identification Code must contain exactly 10 digits')
      return false
   }
   return true
}

const isDiplomaSeriesValid = series => {
   const tokens = series.split(" ")
   if (tokens.length != 2) {
      errorToast('Invalid Diploma Series. Please follow tooltip indications')
      return false
   }
   if (!!!/^\d+$/.test(tokens[1])) {
      errorToast('Invalid Diploma Series. Serial number must contain only digits')
      return false
   }
   return true
}

const isSpecialistPhysicianCertificateSeriesValid = series => {
   const tokens = series.split(" ")
   if (tokens.length != 2) {
      errorToast('Invalid Specialist Physician Certificate Series. Please follow tooltip indications')
      return false
   }
   if (!!!/^\d+$/.test(tokens[1])) {
      errorToast('Invalid Specialist Physician Certificate Series. Serial number must contain only digits')
      return false
   }
   return true
}

const isAccountNameValid = account => {
   if (account.length !== 12) {
      errorToast('Account Name must be 12 characters')
      return false
   }
   if (!!!(account.charAt(0) >= 'a' && account.charAt(0) <= 'z')) {
      errorToast('Account Name must start with a lower case letter')
      return false
   }
   if (!!!account.match(/^[a-z1-5]+$/)) {
      errorToast('Account Name can only contain the characters a-z (lowercase) and 1-5 ')
      return false
   }
   return true
}

export const isDoctorFormValid = form => (
   isSurnameValid(form.surname) &&
   isNameValid(form.name) &&
   isSsnValid(form.ssn) &&
   isUniqueIdentificationCodeValid(form.unique_identification_code) &&
   isDiplomaSeriesValid(form.diploma_series) &&
   isSpecialistPhysicianCertificateSeriesValid(form.specialist_physician_certificate_series) &&
   isAccountNameValid(form.accountName) &&
   form.readInstruction
)