import { errorToast } from "../Toasts";
import { isHostValid, isPortValid, isURLValid } from "./AppEndpointsConfigValidator";
import { store } from "../../../store";

export class AppEndpointsConfigLogic {
   constructor(config) {
      this.config = config
   }

   static makeEmptyConfigObj() {
      return {
         blockchain: 'eos',
         chainId: '',
         host: '',
         port: '',
         protocol: 'http',
         indentification_address: '',
         wallet_address: ''
      }
   }

   static makeCurrentConfigObj() {
      return {
         ...store.getState().blockchain.config,
         ...store.getState().services
      }
   }

   updateConfig(config) {
      this.config = config
   }

   makeBchainConfigObj() {
      return {
         blockchain: this.config.blockchain,
         chainId: this.config.chainId,
         host: this.config.host,
         port: parseInt(this.config.port),
         protocol: this.config.protocol
      }
   }

   needToChangedBlockchainEndpoint() {
      return this.config.host.length !== 0 || this.config.port.length !== 0
   }

   needToChangeIdentificationAddr() {
      return this.config.indentification_address.length !== 0
   }

   needToChangeWalletAddr() {
      return this.config.wallet_address.length !== 0
   }

   isConfigValid() {
      if (this.needToChangedBlockchainEndpoint()) {
         if (!!!isHostValid(this.config.host)) {
            errorToast('Blockchain Host is not valid')
            return false
         }
         if (!!!isPortValid(this.config.port)) {
            errorToast('Blockchain Port is not valid')
            return false
         }
      }
      if (this.needToChangeIdentificationAddr() && !!!isURLValid(this.config.indentification_address)) {
         errorToast('Enter a valid identification URL: http or https:// domain.com or ip : port')
         return false
      }
      if (this.needToChangeWalletAddr() && !!!isURLValid(this.config.wallet_address)) {
         errorToast('Enter a valid wallet URL: http or https:// domain.com or ip : port')
         return false
      }
      return true
   }

}