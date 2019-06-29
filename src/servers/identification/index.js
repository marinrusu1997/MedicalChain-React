import axios from 'axios'
import { identification_service } from "../../remote-api"

export const getDoctorFullNamesFromAccs = async accounts => {
   const fullNamesMap = new Map()
   try {
      const res = await axios({
         method: identification_service.doctorNamesFromAcc.method,
         url: identification_service.baseUrl + identification_service.doctorNamesFromAcc.api,
         data: {
            accounts: accounts
         }
      })
      const fullNamesArr = res.data.accountsMap
      for (const accAndFullName of fullNamesArr) {
         fullNamesMap.set(accAndFullName.account, accAndFullName.full_name)
      }
   } catch (e) {
      console.error(e)
   }
   return Promise.resolve(fullNamesMap)
}

export const getDoctorsInfoFromFullName = full_name => {
   let promise = fetch(identification_service.baseUrl + identification_service.doctorsInfoFromFullName.api, {
      method: identification_service.doctorsInfoFromFullName.method,
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(full_name),
   })
   .then(response => response.json())
   .then(json => json.doctors)
   
   return promise
}

export const getPatientFullNameFromAccount = async account => {
   let fullName = null
   try {
      const res = await axios({
         method: identification_service.patientFullNameFromAcc.method,
         url: identification_service.baseUrl + identification_service.patientFullNameFromAcc.api,
         data: {
            account: account
         }
      })
      fullName = res.data.full_name
   } catch (e) {
      console.error(e)
   }
   return fullName
}

export const getPatientAccountsFromFullName = async full_name => {
   let accountsArr = []
   try {
      const res = await axios({
         method: identification_service.patientAccFromFullName.method,
         url: identification_service.baseUrl + identification_service.patientAccFromFullName.api,
         data: {
            full_name: {
               ...full_name
            }
         }
      })
      accountsArr = res.data.patientsAccounts
   } catch (e) {
      console.error(e)
      if (e.response && e.response.status === 400) {
         accountsArr = []
      } else {
         accountsArr = null
      }
   }
   return Promise.resolve(accountsArr)
}