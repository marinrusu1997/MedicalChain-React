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

const throwAESDecrypt = () => {
   throw new Error('Failed to AES decrypt')
}

const throwRSADecrypt = () => {
   throw new Error('Failed to RSA decrypt')
}

const throwRSAEncrypt = () => {
   throw new Error('Failed to RSA encrypt')
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

   static encryptWithAES = (msg, key) => {
      const iv = this.generateIV()
      const encrypted = CryptoJS.AES.encrypt(msg, key, {
         iv: iv
      })
      return iv.toString() + encrypted.toString()
   }

   static decryptWithAES = (encrypted_packet, key) => {
      const iv = CryptoJS.enc.Hex.parse(encrypted_packet.substr(0, 32))
      const msg = encrypted_packet.substr(32)
      return CryptoJS.AES.decrypt(msg, key, {
         iv: iv
      }).toString(CryptoJS.enc.Utf8)
   }

   static encryptWithRSA = (msg, recipient_pub_key_str, sender_priv_key_json_str) => {
      try {
         const senderRSAPrivKey = getRSAPrivKeyFromJSONStr(sender_priv_key_json_str)
         const EncryptionResult = cryptico.encrypt(msg, recipient_pub_key_str, senderRSAPrivKey)
         if (EncryptionResult.status !== "success") {
            throwRSAEncrypt()
         }
         return EncryptionResult.cipher
      } catch (e) {
         console.error(e)
         throwRSAEncrypt()
      }
   }

   static decryptWithRSA = (msg, recipient_priv_key_json_str) => {
      try {
         const recipientRSAPrivKey = getRSAPrivKeyFromJSONStr(recipient_priv_key_json_str)
         const DecryptionResult = cryptico.decrypt(msg, recipientRSAPrivKey)
         if (DecryptionResult.status !== 'success') {
            throwRSADecrypt()
         }
         if (DecryptionResult.signature !== 'verified') {
            throw new Error('Unverified RSA signature')
         }
         return DecryptionResult.plaintext
      } catch (e) {
         console.error(e)
         throwRSADecrypt()
      }
   }

   static encryptAESWithPassword = (msg, password) => {
      const encrypted = CryptoJS.AES.encrypt(msg, password).toString()
      if (encrypted.length === 0)
         throw new Error('Failed to AES encrypt')
      return encrypted
   }

   static decryptAESWithPassword = (msg, password) => {
      try {
         const decrypted = CryptoJS.AES.decrypt(msg, password).toString(CryptoJS.enc.Utf8)
         if (decrypted.length === 0) {
            throwAESDecrypt()
         }
         return decrypted
      } catch (e) {
         console.error(e)
         throwAESDecrypt()
      }
   }
}
