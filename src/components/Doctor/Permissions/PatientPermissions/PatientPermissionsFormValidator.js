import { validateAccount } from "../../../Permission-Commons/PermValidator"
import { errorToast } from "../../../Utils/Toasts";

export const validatePatientPermissionsForm = patient => {
   if (!!!patient || patient.length === 0) {
      errorToast('Please provide patient account')
      return false
   }
   if (!!!validateAccount(patient)) {
      errorToast('Invalid blockchain account format')
      return false
   }
   return true
}