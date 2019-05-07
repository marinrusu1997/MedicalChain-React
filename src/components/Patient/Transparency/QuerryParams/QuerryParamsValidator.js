import { errorToast } from "../../../Utils/Toasts";
import { validateAccount } from "../../../Permission-Commons/PermValidator";

const hasRequiredFields = params => {
   if (!!!params.doctor) {
      errorToast('Doctor account required')
      return false
   }
   if (!!!params.year) {
      errorToast('Input the year')
      return false
   }
   if (!!!params.month) {
      errorToast('Select month')
      return false
   }
   return true
}

const validateYear = year => {
   const yearNumeric = Number(year)
   if (isNaN(yearNumeric)) {
      errorToast('Year must be numeric')
      return false
   }
   if (yearNumeric < 2019 || yearNumeric > new Date().getFullYear()) {
      errorToast('Year must be between 2019 and current year')
      return false
   }
   return true
}


export const validateQuerryParams = params => (
   hasRequiredFields(params) &&
   validateAccount(params.doctor) &&
   validateYear(params.year)
)