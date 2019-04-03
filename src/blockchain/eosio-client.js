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

export const tryCreateAccount = async (registrationInfo, userType, registrCb) => {
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
      accountInfo: account,
      userType: userType
   }

   try {
      let res = await axios({
         method: validationService.validateIdentity.method,
         url: validationService.validateIdentity.api,
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
      console.log(res.data)
   } catch (e) {
      console.error(e)
      registrCb({
         isSuccessfull: false,
         msg: e.response
            ? e.response.data.message
            : 'Internet connexion error'
      })
   }
}

