import { eosio_client } from "../../blockchain/eosio-wallet-client";
import { Crypto } from "../../blockchain/eosio-crypto";
import { Compressor } from '../../utils/Compressor';
import { retrieveFileFromIPFS } from "../../utils/IPFS";
import { Clipboard } from '../../utils/Clipboard';
import { errorToast, succToast } from '../Utils/Toasts';

export class ViewRecordLogic {
   static tryGetPatientKeyFromBchain = async (patient, enckey) => {
      const doctors = await eosio_client.doctors(eosio_client.getAccountName())
      if (doctors.rows.length !== 1) {
         throw new Error('Seems that you are not a registered doctor')
      }
      let patientRecordsKey = null
      for (const grantedKey of doctors.rows[0].grantedkeys) {
         if (grantedKey.key === patient) {
            patientRecordsKey = grantedKey.value
            break;
         }
      }
      if (!!!patientRecordsKey) {
         throw new Error("Seems this patient didn't granted you any permissions")
      }
      return Crypto.decryptWithRSA(patientRecordsKey, enckey)
   }

   static tryRetrieveRecordFromIPFS = async (hash, key) => {
      return Compressor.decompressLZWURIEncoded(Crypto.decryptWithAES(await retrieveFileFromIPFS(hash), key))
   }

   static viewRecordContent = content => {
      Clipboard.copy(content, () => {
         window.open("http://brynlewis.org/challenge/index.htm", '_blank').focus()
         succToast('Record retrieved. Paste the content into textarea in the opened tab')
      }, () => {
         errorToast('Failed to copy record to cboard')
      })
   }
}
