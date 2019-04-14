import { errorToast } from '../../../Utils/Toasts'
import {
   hasRights,
   hasSpecialties,
   hasLimitedInterval,
   validateAccount,
   tryValidateLimitedInterval,
   validateRight,
   validateSpecialties
} from '../../../Permission-Commons/PermValidator'

const hasPatientAccount = permFromForm => {
   if (!!!permFromForm.patient) {
      errorToast('Patient account is mandatory')
      return false
   }
   return true
}

const hasRequiredFields = permFromForm => (
   hasPatientAccount(permFromForm) &&
   hasLimitedInterval(permFromForm) &&
   hasRights(permFromForm) &&
   hasSpecialties(permFromForm)
)

export const validatePermFromForm = permFromForm => {
   if (!!!hasRequiredFields(permFromForm))
      return false
   if (!!!validateAccount(permFromForm.patient))
      return false
   if (!!!tryValidateLimitedInterval(permFromForm))
      return false
   if (!!!validateRight(permFromForm.right))
      return false
   if (!!!validateSpecialties(permFromForm.specialties))
      return false
   return true
}

