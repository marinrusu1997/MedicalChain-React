import cryptico from 'cryptico'
import CryptoJS from 'crypto-js'
const ecc = require('eosjs-ecc')

const getRSAPrivKeyFromJSONStr = json_str => {
   const RSAPrivKeyJSON = JSON.parse(json_str)
   let RSAPrivKey = new cryptico.RSAKey()
   RSAPrivKey.setPrivateEx(RSAPrivKeyJSON.n, RSAPrivKeyJSON.e,
      RSAPrivKeyJSON.d, RSAPrivKeyJSON.p, RSAPrivKeyJSON.q,
      RSAPrivKeyJSON.dmp1, RSAPrivKeyJSON.dmq1, RSAPrivKeyJSON.coeff)
   return RSAPrivKey
}

export class Crypto {

   static makeEOSIO_ECDSA_Keys = async () => {
      let privateKey = await ecc.randomKey()
      return {
         private: privateKey,
         public: ecc.privateToPublic(privateKey)
      }
   }

   static makeRSAKeys = passphrase => {
      const Bits = 1024
      const RSAKey = cryptico.generateRSAKey(passphrase, Bits)
      const PubKeyString = cryptico.publicKeyString(RSAKey)
      const keys = {
         privRSAJSON: JSON.stringify(RSAKey.toJSON(), null, 2),
         publicEncStr: PubKeyString
      }
      return keys
   }

   static makeAESKey = pass => {
      const salt = CryptoJS.lib.WordArray.random(128 / 8)
      const key = CryptoJS.PBKDF2(pass, salt, {
         keySize: 512 / 32,
         iterations: 1000
      })
      return key.toString()
   }

   static generateIV = () => {
      return CryptoJS.lib.WordArray.random(128 / 8)
   }

   static encryptWithRSA = (msg, recipient_pub_key_str, sender_priv_key_json_str) => {
      const senderRSAPrivKey = getRSAPrivKeyFromJSONStr(sender_priv_key_json_str)
      const EncryptionResult = cryptico.encrypt(msg, recipient_pub_key_str, senderRSAPrivKey)
      if (EncryptionResult.status !== "success") {
         throw new Error('Failed to encrypt')
      }
      return EncryptionResult.cipher
   }

   static decryptWithRSA = (msg, recipient_priv_key_json_str) => {
      const recipientRSAPrivKey = getRSAPrivKeyFromJSONStr(recipient_priv_key_json_str)
      const DecryptionResult = cryptico.decrypt(msg, recipientRSAPrivKey)
      if (DecryptionResult.status !== 'success') {
         throw new Error('Failed to decrypt')
      }
      if (DecryptionResult.signature !== 'verified') {
         throw new Error('Unverified signature')
      }
      return DecryptionResult.plaintext
   }
}
