import { errorToast } from "../../../Utils/Toasts";

const isNameValid = name => {
   if (name === '') {
      errorToast("Name can't be empty")
      return false
   }
   return true
}

const isSurnameValid = surname => {
   if (surname === '') {
      errorToast("Surname can't be empty")
      return false
   }
   return true
}

export const isPatientFullNameValid = full_name => (
   isNameValid(full_name.name) &&
   isSurnameValid(full_name.surname)
)