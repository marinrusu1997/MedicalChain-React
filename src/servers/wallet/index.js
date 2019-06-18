import axios from 'axios'
import { wallet_service } from "../../remote-api"

const storeKey = async (endpoint, account, key) => {
   let success = false
   try {
      const res = await axios({
         method: endpoint.method,
         url: wallet_service.baseUrl + endpoint.api,
         data: {
            account: account,
            key: key
         }
      })
      if (res.status === 200) {
         success = true
      }
   } catch (e) {
      console.error(e)
      console.error(e.response)
   }
   return success
}

const retrieveKey = async (endpoint, account) => {
   let key = null
   try {
      const res = await axios({
         method: endpoint.method,
         url: wallet_service.baseUrl + endpoint.api,
         data: {
            account: account
         }
      })
      if (res.status === 200) {
         key = res.data.key
      }
   } catch (e) {
      console.error(e)
      console.error(e.response)
   }
   return key
}

export const storeEncryptionKey = async (account, key) => {
   return await storeKey(wallet_service.store.encryption, account, key)
}

export const storeRecordsKey = async (account, key) => {
   return await storeKey(wallet_service.store.records, account, key)
}

export const retrieveEncryptionKey = async account => {
   return await retrieveKey(wallet_service.retrieve.encryption, account)
}

export const retrieveRecordsKey = async account => {
   return await retrieveKey(wallet_service.retrieve.records, account)
}