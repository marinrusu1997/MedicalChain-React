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

const isGenderValid = gender => {
   if (gender.length === 0) {
      errorToast('Type the gender')
      return false
   }
   if (gender.charAt(0) !== 'M' && gender.charAt(0) !== 'F') {
      errorToast('Gender must be M or F')
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

const isIDCardNumberValid = cardNumber => {
   if (cardNumber.length <= 2) {
      errorToast('Card Number must contain at least 3 characters')
      return false
   }
   return true
}

const isBirthdayValid = birthday => {
   if (isNaN(Date.parse(birthday))) {
      errorToast('Birthday is invalid')
      return false
   }
   return true
}

const isEmailValid = email => {
   return /\S+@\S+\.\S+/.test(email)
}

const isAccountNameValid = accountName => {
   let account = accountName
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

const isPasswordValid = pass => {
   const validated =
      /[A-Z]/.test(pass) &&
      /[a-z]/.test(pass) &&
      /[0-9]/.test(pass) &&
      /[^A-Za-z0-9]/.test(pass) &&
      pass.length >= 10
   const err_msg = 'Password should contain \n' + 
                  '1.At least one uppercase letter\n' +
                  '2.At least one lowercase letter\n' +
                  '3.At least one digit\n' + 
                  '4.At least one special symbol\n' + 
                  '5.Should be more than 10 character'
   if (!!!validated) {
      errorToast(err_msg)
      return false
   }
   return true
}

export const isPatientFormValid = form => (
   isSurnameValid(form.surname) &&
   isNameValid(form.name) &&
   isGenderValid(form.gender) &&
   isSsnValid(form.ssn) &&
   isIDCardNumberValid(form.cardNumber) &&
   isBirthdayValid(form.birthday) &&
   isAccountNameValid(form.accountName) &&
   isPasswordValid(form.password) &&
   form.readInstruction
)