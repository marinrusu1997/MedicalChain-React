import axios from 'axios'
import { server } from "../remote-api"

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