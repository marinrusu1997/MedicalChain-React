import { eosio_client } from "../../../blockchain/eosio-wallet-client"

export class ReadRecordsLogic {
   static readRecordsMetadataFromBchainAsPatient = async () => {
      const tr_status = await eosio_client.records_table()
      if (!!!tr_status.isSuccess) {
         throw new Error(tr_status.msg)
      }
      return JSON.parse(tr_status.tr_receipt.processed.action_traces[0].console)
   }
}