import { getDoctorFullNamesFromAccs } from "../../servers/identification";
import { errorToast } from "../Utils/Toasts";

export class DoctorAccToFnameMapper {
   constructor() {
      this.doctorAccToFNameMap = new Map()
   }

   getFullName = account => this.doctorAccToFNameMap.get(account)

   getFullNameOrAccountIfMissing = account => {
      const fullName = this.doctorAccToFNameMap.get(account)
      if (!!!fullName) {
         return account
      }
      return fullName.surname + " " + fullName.name
   }

   tryRetrieveFullNames = async accounts => {
      if (accounts.length !== 0) {
         const docAccsRetrievedFromServer = await getDoctorFullNamesFromAccs(accounts)
         if (docAccsRetrievedFromServer.size === 0) {
            return errorToast('Failed to retrieve missing doctor full names')
         }
         docAccsRetrievedFromServer.forEach((fullName, account) => this.doctorAccToFNameMap.set(account, fullName))
      }
   }
}