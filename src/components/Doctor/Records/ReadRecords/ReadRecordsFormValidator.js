import { errorToast } from "../../../Utils/Toasts"
import { validateAccount } from "../../../Permission-Commons/PermValidator"

const hasRequiredFields = params => {
   if (!!!params.patient) {
      errorToast('Please provide patient account')
      return false
   }
   if (!!!params.specialities) {
      errorToast('Please provide specialities of the medical records')
      return false
   }
   if (!!!params.start) {
      errorToast('Please provide start time for the desired interval')
      return false
   }
   if (!!!params.stop) {
      errorToast('Please provide end time for the desired interval')
      return false
   }
   return true
}

const validateSpecialities = specialities => {
   if (specialities.length === 0) {
      errorToast('Please provide at least one specialty')
      return false
   }
   return true
}

const validateIntervalExistence = (start, stop) => {
   if (start.length === 0) {
      errorToast('Please provide start time for the desired interval')
      return false
   }
   if (stop.length === 0) {
      errorToast('Please provide end time for the desired interval')
      return false
   }
   return true
}

const validateInterval = (start, stop) => {
   const startTime = (Date.parse(start) / 1000).toFixed(0)
   const stopTime = (Date.parse(stop) / 1000).toFixed(0)
   if (stopTime <= startTime) {
      errorToast('End time must be greather than start time')
      return false
   }
   return true
}

export const validateReadParams = params => (
   hasRequiredFields(params) &&
   validateAccount(params.patient) &&
   validateSpecialities(params.specialities) &&
   validateIntervalExistence(params.start, params.stop) &&
   validateInterval(params.start, params.stop)
)