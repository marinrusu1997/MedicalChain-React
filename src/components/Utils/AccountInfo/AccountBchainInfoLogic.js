import { eosio_client } from "../../../blockchain/eosio-wallet-client"
import { errorToast } from "../Toasts";

export class AccountBChainInfoLogic {

   static cachedAccountParts = null

   static _refundRequestToString(refund_request) {
      return "Time " + refund_request.request_time + " Net Amount " + refund_request.net_amount + " CPU Amount " + refund_request.cpu_amount
   }

   static _getErrAccountParts() {
      return {
         resources: {
            cpu: {
               max: 'ERROR',
               available: 'ERROR',
               used: 'ERROR'
            },
            net: {
               max: 'ERROR',
               available: 'ERROR',
               used: 'ERROR'
            },
            ram: {
               quota: 'ERROR',
               usage: 'ERROR'
            }
         },
         general: {
            created: 'ERROR',
            privileged: 'ERROR',
            refund_request: 'ERROR',
            self_delegated_bandwidth: 'ERROR',
            voter_info: 'ERROR',
            total_resources: 'ERROR'
         },
         permissions: []
      }
   }

   static async getAccountParts() {
      try {
         if (this.cachedAccountParts) {
            return this.cachedAccountParts
         }
         const details = await eosio_client.account_info(eosio_client.getAccountName())
         this.cachedAccountParts = {
            resources: {
               cpu: {
                  max: details.cpu_limit.max == -1 ? 'INFINITE' : details.cpu_limit.max,
                  available: details.cpu_limit.available == -1 ? 'INFINITE' : details.cpu_limit.available,
                  used: details.cpu_limit.used == -1 ? 'INFINITE' : details.cpu_limit.used
               },
               net: {
                  max: details.net_limit.max == -1 ? 'INFINITE' : details.net_limit.max,
                  available: details.net_limit.available == -1 ? 'INFINITE' : details.net_limit.available,
                  used: details.net_limit.used == -1 ? 'INFINITE' : details.net_limit.used
               },
               ram: {
                  quota: details.ram_quota == -1 ? 'INFINITE' : details.ram_quota,
                  usage: details.ram_usage
               }
            },
            general: {
               created: details.created,
               privileged: details.privileged ? 'Yes' : 'No',
               refund_request: details.refund_request ? this._refundRequestToString(details.refund_request) : 'Missing',
               self_delegated_bandwidth: details.self_delegated_bandwidth ? 'UNKNOWN SCHEMA OBJ' : 'Missing',
               voter_info: details.voter_info ? 'UNKNOWN SCHEMA OBJ' : 'Missing',
               total_resources: details.total_resources ? 'UNKNOWN SCHEMA OBJ' : 'Missing'
            },
            permissions: details.permissions
         }
         return this.cachedAccountParts
      } catch (e) {
         errorToast(e.message)
         return this._getErrAccountParts()
      }
   }
}
