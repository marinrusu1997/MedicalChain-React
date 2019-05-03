import { errorToast } from "../../Utils/Toasts"

export const validateKeysRequestForm = form => {
   if (!!!form.password && !!!form.enckey) {
      errorToast('Please provide either password or encryption key')
      return false
   }
   return true
}