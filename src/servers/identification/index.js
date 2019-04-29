import axios from 'axios'
import { server } from "../../remote-api"

export const getDoctorFullNamesFromAccs = async accounts => {
   const fullNamesMap = new Map()
   try {
      const res = await axios({
         method: server.doctorNamesFromAcc.method,
         url: server.doctorNamesFromAcc.api,
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

export const getPatientAccountsFromFullName = async full_name => {
   let accountsArr = []
   try {
      const res = await axios({
         method: server.patientAccFromFullName.method,
         url: server.patientAccFromFullName.api,
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