import { eosio_client } from '../../blockchain/eosio-wallet-client'

export class BchainStateLogic {
   static getDefaultEmptyState() {
      return {
         block_cpu_limit: '',
         block_net_limit: '',
         chain_id: '',
         head_block_id: '',
         head_block_num: '',
         head_block_producer: '',
         head_block_time: '',
         last_irreversible_block_id: '',
         last_irreversible_block_num: '',
         server_version: '',
         server_version_string: '',
         virtual_block_cpu_limit: '',
         virtual_block_net_limit: ''
      }
   }

   static async getBchainState() {
      try {
         return await eosio_client.bchain_state()
      } catch (e) {
         return this.getDefaultEmptyState()
      }
   }
}