const ecc = require('eosjs-ecc')

export class EOSIOCrypto {

   static makeKeys = async () => {
      let privateKey = await ecc.randomKey()
      return {
         private: privateKey,
         public: ecc.privateToPublic(privateKey)
      }
   }
}
