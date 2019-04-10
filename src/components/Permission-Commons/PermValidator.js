import { errorToast } from '../Utils/Toasts'

export const hasDoctorAccount = perm => {
   if (!!!perm.doctor) {
      errorToast('Doctor field is mandatory')
      return false
   }
   return true
}

export const hasSpecialties = perm => {
   if (!!!perm.specialties) {
      errorToast('Select specialty from dropdown')
      return false
   }
   return true
}

export const hasRights = perm => {
   if (!!!perm.right) {
      errorToast('Select right from dropdown')
      return false
   }
   return true
}

export const hasLimitedInterval = perm => {
   if (perm.interval === "LIMITED") {
      if (!!!perm.start) {
         errorToast('Start date is mandatory')
         return false
      }
      if (!!!perm.stop) {
         errorToast('End date is mandatory')
         return false
      }
   }
   return true
}

export const hasRequiredFields = perm => (
   hasDoctorAccount(perm) &&
   hasSpecialties(perm) &&
   hasRights(perm) &&
   hasLimitedInterval(perm)
)

export const validateStartTime = perm => {
   const currentTime = (new Date().getTime() / 1000).toFixed(0)
   const startTime = (Date.parse(perm.start) / 1000).toFixed(0)
   if ((startTime - 60) < currentTime) {
      errorToast('Start time must be at least 1 min greather than current time')
      return false
   }
   return true
}

export const validateEndTime = perm => {
   const startTime = (Date.parse(perm.start) / 1000).toFixed(0)
   const stopTime = (Date.parse(perm.stop) / 1000).toFixed(0)
   if (stopTime - 300 < startTime) {
      errorToast('End time must be at least 5 min greather than start time')
      return false
   }
   return true
}

export const validateTimeIsInCorrectInterval = perm => {
   const startTime = (Date.parse(perm.start) / 1000).toFixed(0)
   const stopTime = (Date.parse(perm.stop) / 1000).toFixed(0)

   if (startTime === 0 && stopTime === 0)
      return true
   if (startTime !== 0 && stopTime !== 0)
      return true
   console.error('start: ', startTime, 'stop: ', stopTime)
   errorToast('Start and End time are not in a valid interval. This is a sofware bug, please reload the page and retry')
   return false
}

export const validateAccount = account => {
   if (account.length === 0 || !account.trim()) {
      errorToast("Account name can't be empty")
      return false
   }
   if (!!!(account.charAt(0) >= 'a' && account.charAt(0) <= 'z')) {
      errorToast('Account name must start with a lower case letter')
      return false
   }
   if (!!!account.match(/^[a-z1-5]+$/)) {
      errorToast('Account name can only contain the characters a-z (lowercase) and 1-5 ')
      return false
   }
   return true
}

export const validateSpecialties = specialties => {
   if (specialties.length === 0) {
      errorToast('Select specialty(i.e in uppercase ones)')
      return false
   }
   return true
}

export const validateRight = right => {
   if (right === "Right") {
      errorToast('Select a valid right')
      return false
   }
   return true
}

export const tryValidateLimitedInterval = perm => {
   if (perm.interval === "LIMITED") {
      if (!!!validateStartTime(perm))
         return false
      if (!!!validateEndTime(perm))
         return false
      return true
   } else if (perm.interval === 'INFINITE') {
      return true
   }
}

export const validateForAdding = perm => {
   if (!!!hasRequiredFields(perm))
      return false
   if (!!!validateAccount(perm.doctor))
      return false
   if (!!!validateSpecialties(perm.specialties))
      return false
   if (!!!validateRight(perm.right))
      return false
   if (!!!validateTimeIsInCorrectInterval(perm))
      return false
   if (!!!tryValidateLimitedInterval(perm))
      return false
   return true
}

export const preliminaryValidationsForUpdating = perm => {
   if (!!!perm.right) {
      errorToast('Select right from dropdown')
      return false
   }
   if (perm.interval === "LIMITED") {
      if (!!!perm.start || perm.start.length === 0) {
         errorToast('Start date is mandatory')
         return false
      }
      if (!!!perm.stop || perm.stop.length === 0) {
         errorToast('End date is mandatory')
         return false
      }
   }
   return true
}

export const validateForUpdating = perm => {
   if (!!!preliminaryValidationsForUpdating(perm))
      return false
   if (!!!validateRight(perm.right))
      return false
   if (!!!validateSpecialties(perm.specialties))
      return false
   if (!!!validateTimeIsInCorrectInterval(perm))
      return false
   if (!!!tryValidateLimitedInterval(perm))
      return false
   return true
}