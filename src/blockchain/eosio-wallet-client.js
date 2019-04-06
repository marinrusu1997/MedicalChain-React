import { Api, JsonRpc, RpcError } from "eosjs"
import ScatterJS from "scatterjs-core"
import ScatterEOS from "scatterjs-plugin-eosjs2"

import { rightsBchainTableLoaded, specialitiesBchainTableLoaded } from '../store/Blockchain/actions'
import { store } from '../store'

const requiredFields = {
   personal: ['firstname', 'lastname', 'email', 'birthdate'],
   location: ['phone', 'address', 'city', 'state', 'country', 'zipcode'],
   accounts: null
}

const medicalContract = {
   account: 'medical4',
   actions: {
      addperm: 'addperm',
      updtperm: 'updtperm',
      rmperm: 'rmperm'
   },
   tables: {
      rights: { name: 'rights', limit: 1 },
      specialities: { name: 'specialities', limit: 1 },
      records: { name: 'records', limit: 1 },
      permissions: { name: 'permissions', limit: 10 }
   }
}

ScatterJS.plugins(new ScatterEOS());

const getErrMsgFromRpcErr = e => {
   let err_obj = e.json
   let resp = ''
   if (err_obj.error.details[0])
      resp += err_obj.error.details[0].message
   return resp
}

class EOSIOWalletClient {

   constructor(contractAccount) {
      this.connect = this.connect.bind(this)
      this.disconnect = this.disconnect.bind(this)

      this.contractAccount = contractAccount
      this.resync_with_new_bchain_node_config()
   }

   resync_with_new_bchain_node_config = () => {
      this.network = ScatterJS.Network.fromJson(store.getState().blockchain.config)
      requiredFields.accounts = [this.network]
      this.rpc = new JsonRpc(this.network.fullhost())
   }

   connect = (onSuc, onErr) => {
      let msgBchain = "Appliaction can't connect to blockchain node"
      let msg = "Application can't connect to your Scatter wallet," +
         "make sure you opened and unlocked him. " +
         "For detailed error open console in your browser"
      this.rpc.get_info()
         .then(info => {
            this.network.chainId = info.chain_id
            const _network = this.network
            ScatterJS.connect(this.contractAccount, { _network })
               .then(connected => {
                  if (!connected)
                     return onErr(msg)
                  this.scatter = ScatterJS.scatter
                  this.scatter.getIdentity(requiredFields)
                     .then(identity => {
                        this.identity = identity
                        this.account = this.identity.accounts.find(
                           x => x.blockchain === "eos"
                        )
                        this.eos = ScatterJS.eos(this.network, Api, { expireInSeconds: 60, rpc: this.rpc, beta3: true })
                        window.ScatterJS = null
                        onSuc(this.account.name)
                     }).catch(e => {
                        console.error(e)
                        onErr(e.message)
                     })
               })
         }).catch(e => {
            console.error(e)
            onErr(msgBchain)
         })
   }

   disconnect = () => {
      if (this.scatter) {
         this.scatter.forgetIdentity()
         this.identity = null
      } else {
         console.error('Not connected to wallet')
      }
   }

   is_connected = () => {
      return this.account ? true : false
   }

   getAccountName = () => {
      if (!!!this.account)
         throw new Error('Not connected to wallet')
      return this.account.name
   }

   _table = async (name, scope, limit) => {
      return await this.rpc.get_table_rows({
         code: this.contractAccount,
         scope: scope,
         table: name,
         limit: limit || 10
      })
   }

   _rights = async () => {
      const { name, limit } = medicalContract.tables.rights
      return await this._table(name, this.contractAccount, limit)
   }

   load_rigths_to_nomenclator = async (onSuc, onErr) => {
      try {
         const rights = await eosio_client._rights()
         const rightsMap = new Map()
         rights.rows[0].mapping.forEach(right => {
            rightsMap.set(right.key, right.value)
         })
         store.dispatch(rightsBchainTableLoaded(rightsMap))
         onSuc()
      } catch (e) {
         console.error(e)
         console.error(e)
         if (e instanceof RpcError) {
            onErr(getErrMsgFromRpcErr(e))
         } else if (e.message) {
            onErr(e.message)
         } else {
            onErr('Failed to load rights nomenclator')
         }
      }
   }

   _specilities = async () => {
      const { name, limit } = medicalContract.tables.specialities
      return await this._table(name, this.contractAccount, limit)
   }

   load_specialities_to_nomenclator = async (onSuc, onErr) => {
      try {
         const specialities = await eosio_client._specilities()
         const specialitiesMap = new Map()
         specialities.rows[0].mapping.forEach(specialty => {
            specialitiesMap.set(specialty.key, specialty.value)
         })
         store.dispatch(specialitiesBchainTableLoaded(specialitiesMap))
         onSuc()
      } catch (e) {
         console.error(e)
         console.error(e)
         if (e instanceof RpcError) {
            onErr(getErrMsgFromRpcErr(e))
         } else if (e.message) {
            onErr(e.message)
         } else {
            onErr('Failed to load specialities nomenclator')
         }
      }
   }

   records = async () => {
      if (!!!this.account)
         throw new Error('Failed load records table : Not connected to wallet')
      const { name, limit } = medicalContract.tables.records
      return await this._table(name, this.account.name, limit)
   }

   permissions = async limit => {
      if (!!!this.account)
         throw new Error('Failed load permissions table : Not connected to wallet')
      const { name } = medicalContract.tables.permissions
      return await this._table(name, this.account.name, limit)
   }

   permissions_from_limit = async lower_bound => {
      if (!!!this.account)
         throw new Error('Failed load permissions table : Not connected to wallet')
      return await this.rpc.get_table_rows({
         code: this.contractAccount,
         scope: this.account.name,
         table: medicalContract.tables.permissions.name,
         lower_bound: lower_bound
      })
   }

   _transaction = (action, data) => {
      return this.eos.transact(
         {
            actions: [
               {
                  account: this.contractAccount,
                  name: action,
                  authorization: [
                     {
                        actor: this.account.name,
                        permission: this.account.authority
                     }
                  ],
                  data: {
                     ...data
                  }
               }
            ]
         },
         {
            blocksBehind: 3,
            expireSeconds: 30
         }
      )
   }

   add_permission = async (perm, onSucc, onErr) => {
      try {
         if (!!!this.account) {
            onErr('Failed push transaction : Not connected to wallet')
            return
         }
         onSucc(await this._transaction(medicalContract.actions.addperm, {
            perm: {
               patient: this.account.name,
               doctor: perm.doctor
            },
            specialtyid: perm.specialtyid,
            rightid: perm.rightid,
            interval: {
               from: perm.from,
               to: perm.to
            }
         }))
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            onErr(getErrMsgFromRpcErr(e))
         } else if (e.message) {
            onErr(e.message)
         } else {
            onErr('Failed to push transaction')
         }
      }
   }

   updt_permission = async (perm, onSucc, onErr) => {
      try {
         if (!!!this.account) {
            onErr('Failed push transaction : Not connected to wallet')
            return
         }
         onSucc(await this._transaction(medicalContract.actions.updtperm, {
            perm: {
               patient: this.account.name,
               doctor: perm.doctor
            },
            permid: perm.permid,
            rightid: perm.rightid,
            interval: {
               from: perm.from,
               to: perm.to
            }
         }))
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            onErr(getErrMsgFromRpcErr(e))
         } else if (e.message) {
            onErr(e.message)
         } else {
            onErr('Failed to push transaction')
         }
      }
   }

   rm_permission = async (perm, onSucc, onErr) => {
      try {
         if (!!!this.account) {
            onErr('Failed push transaction : Not connected to wallet')
            return
         }
         onSucc(await this._transaction(medicalContract.actions.rmperm, {
            perm: {
               patient: this.account.name,
               doctor: perm.doctor
            },
            permid: perm.id
         }))
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            onErr(getErrMsgFromRpcErr(e))
         } else if (e.message) {
            onErr(e.message)
         } else {
            onErr('Failed to push transaction')
         }
      }
   }
}

export const eosio_client = new EOSIOWalletClient(medicalContract.account)

eosio_client.load_rigths_to_nomenclator(() => { }, msg => { })
eosio_client.load_specialities_to_nomenclator(() => { }, msg => { })