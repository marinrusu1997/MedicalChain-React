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

export const tryCreatePatientAccount = async (registrationInfo, registrCb) => {
   let ownerKeys = await EOSIOCrypto.makeKeys()
   let activeKeys = await EOSIOCrypto.makeKeys()
   let { privRSAJSON, publicEncStr } = createEncryptionKeys("" + registrationInfo.ssn + registrationInfo.birthday)
   let account = {
      name: registrationInfo.accountName,
      ownerKey: ownerKeys.public,
      activeKey: activeKeys.public,
      encryptionKey: publicEncStr
   }
   let accountCreationInfo = {
      userInfo: ObjectDecorator.removeProperty(registrationInfo, 'accountName'),
      accountInfo: account
   }

   try {
      let res = await axios({
         method: validationService.validatePatientIdentity.method,
         url: validationService.validatePatientIdentity.api,
         data: accountCreationInfo
      })
      registrCb({
         isSuccessfull: true,
         accountDetails: {
            name: account.name,
            keys: {
               owner: ownerKeys.private,
               active: activeKeys.private,
               encryption: privRSAJSON
            },
            transaction: {
               id: res.data.transaction_id,
               block_time: res.data.block_time,
               block_num: res.data.block_num,
               ...res.data.receipt
            }
         }
      })
   } catch (e) {
      console.error(e)
      registrCb({
         isSuccessfull: false,
         msg: e.response
            ? e.response.data.message ? e.response.data.message : 'Failed to connect to identification service'
            : 'Internet connection error'
      })
   }
}

export const tryCreateDoctorAccount = async (registrationInfo, registrCb) => {
   let ownerKeys = await EOSIOCrypto.makeKeys()
   let activeKeys = await EOSIOCrypto.makeKeys()
   let account = {
      name: registrationInfo.account_name,
      ownerKey: ownerKeys.public,
      activeKey: activeKeys.public
   }
   let accountCreationInfo = {
      userInfo: ObjectDecorator.removeProperty(registrationInfo, 'account_name'),
      accountInfo: account
   }

   try {
      let res = await axios({
         method: validationService.validateDoctorIdentity.method,
         url: validationService.validateDoctorIdentity.api,
         data: accountCreationInfo
      })
      registrCb({
         isSuccessfull: true,
         accountDetails: {
            name: account.name,
            keys: {
               owner: ownerKeys.private,
               active: activeKeys.private
            },
            transaction: {
               id: res.data.transaction_id,
               block_time: res.data.block_time,
               block_num: res.data.block_num,
               ...res.data.receipt
            }
         }
      })
   } catch (e) {
      console.error(e)
      registrCb({
         isSuccessfull: false,
         msg: e.response
            ? e.response.data.message ? e.response.data.message : 'Failed to connect to identification service'
            : 'Internet connection error'
      })
   }
}

