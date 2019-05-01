import { errorToast } from "../../../Utils/Toasts"
import { validateAccount } from "../../../Permission-Commons/PermValidator";

const hasRequiredFields = params => {
   if (!!!params.patient) {
      errorToast('Please provide patient account')
      return false
   }
   if (!!!params.speciality) {
      errorToast('Please provide speciality of the medical record')
      return false
   }
   if (!!!params.fileDetails) {
      errorToast('Please choose a medical record')
      return false
   }
   if (!!!params.description) {
      errorToast('Each record must be accompanied by a description')
      return false
   }
   if (!!!params.password && !!!params.enckey) {
      errorToast('Please provide either password or encryption key')
      return false
   }
   return true
}

export const validateAddParams = params => (
   hasRequiredFields(params) &&
   validateAccount(params.patient)
)