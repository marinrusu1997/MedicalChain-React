import axios from 'axios'
import { server } from '../remote-api'
import { Crypto } from './eosio-crypto'
import { ObjectDecorator } from '../utils/ObjectDecorator'

const __makeRequiredKeysObj = async registrationInfo => ({
   ownerKeys: await Crypto.makeEOSIO_ECDSA_Keys(),
   activeKeys: await Crypto.makeEOSIO_ECDSA_Keys(),
   encryptionKeys: Crypto.makeRSAKeys(registrationInfo.ssn +
      (registrationInfo.birthday ? registrationInfo.birthday : registrationInfo.unique_identification_code))
})

const __makeAccountObj = (accountName, keys, specialtyid) => ({
   name: accountName,
   ownerKey: keys.ownerKeys.public,
   activeKey: keys.activeKeys.public,
   encryptionKey: keys.encryptionKeys.publicEncStr,
   specialtyid: specialtyid ? specialtyid : -1
})

const __makeAccountCreationInfoObj = (registrationInfo, accountObj) => {
   let registrationInfoWithoutSensitiveData = ObjectDecorator.removeProperty(ObjectDecorator.removeProperty(registrationInfo, 'accountName'), 'password')
   if (registrationInfo.specialty_id) {
      return {
         userInfo: ObjectDecorator.removeProperty(registrationInfoWithoutSensitiveData, 'specialty_id'),
         accountInfo: accountObj
      }
   } else {
      return {
         userInfo: registrationInfoWithoutSensitiveData,
         accountInfo: accountObj
      }
   }
}

const __makeAccountRegistrationDetailsObj = (accountObj, keys, password, tr_receipt) => ({
   isSuccessfull: true,
   accountDetails: {
      name: accountObj.name,
      keys: {
         owner: keys.ownerKeys.private,
         active: keys.activeKeys.private,
         encryption: keys.encryptionKeys.privRSAJSON,
         records: password ? Crypto.makeAESKey(password) : null
      },
      transaction: {
         id: tr_receipt.transaction_id,
         block_time: tr_receipt.block_time,
         block_num: tr_receipt.block_num,
         ...tr_receipt.receipt
      }
   }
})

const __makeErrorDetailsObj = error => ({
   isSuccessfull: false,
   msg: error.response
      ? error.response.data.message ? error.response.data.message : 'Failed to connect to identification service'
      : 'Internet connection error'
})

const tryCreateAccount = async (registrationInfo, registrCb, api, isPatient) => {
   const requiredKeys = await __makeRequiredKeysObj(registrationInfo)
   const account = __makeAccountObj(registrationInfo.accountName, requiredKeys, registrationInfo.specialty_id)
   const password = registrationInfo.password
   const accountCreationInfo = __makeAccountCreationInfoObj(registrationInfo, account)

   try {
      const res = await axios({
         ...api,
         data: accountCreationInfo
      })
      registrCb(__makeAccountRegistrationDetailsObj(
         account,
         requiredKeys,
         isPatient ? password : null,
         res.data))
   } catch (e) {
      console.error(e)
      registrCb(__makeErrorDetailsObj(e))
   }
}

export const tryCreatePatientAccount = async (registrationInfo, registrCb) => {
   await tryCreateAccount(registrationInfo, registrCb, {
      method: server.registerPatient.method,
      url: server.registerPatient.api,
   }, true)
}

export const tryCreateDoctorAccount = async (registrationInfo, registrCb) => {
   await tryCreateAccount(registrationInfo, registrCb, {
      method: server.registerDoctor.method,
      url: server.registerDoctor.api,
   }, false)
}

