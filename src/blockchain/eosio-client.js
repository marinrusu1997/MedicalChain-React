import axios from 'axios'
import { validationService } from '../remote-api'
import { EOSIOCrypto } from './eosio-crypto'
import cryptico from 'cryptico'
import { ObjectDecorator } from '../utils/ObjectDecorator'

const createEncryptionKeys = passphrase => {
   const Bits = 1024
   const RSAKey = cryptico.generateRSAKey(passphrase, Bits)
   const PubKeyString = cryptico.publicKeyString(RSAKey)
   return {
      privRSAJSON: JSON.stringify(RSAKey.toJSON(), null, 2),
      publicEncStr: PubKeyString
   }
}

const __makeRequiredKeysObj = async registrationInfo => ({
   ownerKeys: await EOSIOCrypto.makeKeys(),
   activeKeys: await EOSIOCrypto.makeKeys(),
   encryptionKeys: createEncryptionKeys("" + registrationInfo.ssn + registrationInfo.birthday)
})

const __makeAccountObj = (accountName, keys) => ({
   name: accountName,
   ownerKey: keys.ownerKeys.public,
   activeKey: keys.activeKeys.public,
   encryptionKey: keys.encryptionKeys.publicEncStr
})

const __makeAccountCreationInfoObj = (registrationInfo, accountObj) => ({
   userInfo: ObjectDecorator.removeProperty(registrationInfo, 'accountName'),
   accountInfo: accountObj
})

const __makeAccountRegistrationDetailsObj = (accountObj, keys, tr_receipt) => ({
   isSuccessfull: true,
   accountDetails: {
      name: accountObj.name,
      keys: {
         owner: keys.ownerKeys.private,
         active: keys.activeKeys.private,
         encryption: keys.encryptionKeys.privRSAJSON
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

const tryCreateAccount = async (registrationInfo, registrCb, api) => {
   const requiredKeys = await __makeRequiredKeysObj(registrationInfo)
   const account = __makeAccountObj(registrationInfo.accountName, requiredKeys)
   const accountCreationInfo = __makeAccountCreationInfoObj(registrationInfo, account)

   try {
      const res = await axios({
         ...api,
         data: accountCreationInfo
      })
      registrCb(__makeAccountRegistrationDetailsObj(account, requiredKeys, res.data))
   } catch (e) {
      console.error(e)
      registrCb(__makeErrorDetailsObj(e))
   }
}

export const tryCreatePatientAccount = async (registrationInfo, registrCb) => {
   await tryCreateAccount(registrationInfo, registrCb, {
      method: validationService.validatePatientIdentity.method,
      url: validationService.validatePatientIdentity.api,
   })
}

export const tryCreateDoctorAccount = async (registrationInfo, registrCb) => {
   await tryCreateAccount(registrationInfo, registrCb, {
      method: validationService.validateDoctorIdentity.method,
      url: validationService.validateDoctorIdentity.api,
   })
}

