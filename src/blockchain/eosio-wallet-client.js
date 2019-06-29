import { Api, JsonRpc, RpcError, Serialize } from "eosjs"
import { TextDecoder, TextEncoder } from 'util'
import ScatterJS from "scatterjs-core"
import ScatterEOS from "scatterjs-plugin-eosjs2"
import { Crypto } from "./eosio-crypto";

import { rightsBchainTableLoaded, specialitiesBchainTableLoaded, bchainChainIdLoaded } from '../store/Blockchain/actions'
import { store } from '../store'

const requiredFields = {
   personal: ['firstname', 'lastname', 'email', 'birthdate'],
   location: ['phone', 'address', 'city', 'state', 'country', 'zipcode'],
   accounts: null
}

const medicalContract = {
   account: 'medical',
   actions: {
      addperm: 'addperm',
      updtperm: 'updtperm',
      rmperm: 'rmperm',
      writerecord: 'writerecord',
      readrecords: 'readrecords',
      recordstab: 'recordstab'
   },
   tables: {
      rights: { name: 'rights', limit: 1 },
      specialities: { name: 'specialities', limit: 1 },
      patients: { name: 'patients', limit: 1 },
      doctors: { name: 'doctors', limit: 1 },
      permissions: { name: 'permissions', limit: 10 },
      records: { name: 'records', limit: 1 }
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
            store.dispatch(bchainChainIdLoaded(info.chain_id))
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
         if (e instanceof RpcError) {
            onErr(getErrMsgFromRpcErr(e))
         } else if (e.message) {
            onErr(e.message)
         } else {
            onErr('Failed to load specialities nomenclator')
         }
      }
   }

   patients_by_scope = async patient_acc_scope => {
      const { name, limit } = medicalContract.tables.patients
      return await this._table(name, patient_acc_scope, limit)
   }

   patients = async () => {
      if (!!!this.account)
         throw new Error('Failed load records table : Not connected to wallet')
      return await this.patients_by_scope(this.account.name)
   }

   permissions_by_scope = async (limit, patient_acc_scope) => {
      const { name } = medicalContract.tables.permissions
      return await this._table(name, patient_acc_scope, limit)
   }

   permissions = async limit => {
      if (!!!this.account)
         throw new Error('Failed load permissions table : Not connected to wallet')
      return await this.permissions_by_scope(limit, this.account.name)
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

   doctors = async account => {
      const { name, limit } = medicalContract.tables.doctors
      return await this._table(name, account, limit)
   }

   account_info = async account => await this.rpc.get_account(account)

   bchain_state = async () => await this.rpc.get_info()

   actions = async (account, pos, offset) => await this.rpc.history_get_actions(account, pos, offset)

   producer_schedule = async () => await this.rpc.get_producer_schedule()

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
            onErr('Failed to push transaction : Not connected to wallet')
            return
         }
         let encrypted_patient_decreckey = perm.decreckey
         if (perm.decreckey !== "") {
            const doctor_table = await this.doctors(perm.doctor)
            if (doctor_table.rows.length === 0) {
               onErr('This is not a doctor account')
               return
            }
            encrypted_patient_decreckey = Crypto.encryptWithRSA(perm.decreckey, doctor_table.rows[0].pubenckey, perm.enckey)
            perm.decreckey = null
            perm.enckey = null
         }
         onSucc(await this._transaction(medicalContract.actions.addperm, {
            perm: {
               patient: this.account.name,
               doctor: perm.doctor
            },
            specialtyids: perm.specialtyids,
            rightid: perm.rightid,
            interval: {
               from: perm.from,
               to: perm.to
            },
            decreckey: encrypted_patient_decreckey
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
            onErr('Failed to push transaction : Not connected to wallet')
            return
         }
         onSucc(await this._transaction(medicalContract.actions.updtperm, {
            perm: {
               patient: this.account.name,
               doctor: perm.doctor
            },
            permid: perm.permid,
            specialtyids: perm.specialtyids,
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
            onErr('Failed to push transaction : Not connected to wallet')
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

   add_record = async recordDetails => {
      const status = {
         isSuccess: false
      }
      try {
         if (!!!this.account) {
            status.msg = 'Failed to push transaction : Not connected to wallet'
         } else {
            const tr_receipt = await this._transaction(medicalContract.actions.writerecord, {
               perm: {
                  patient: recordDetails.patient,
                  doctor: this.account.name
               },
               specialtyid: recordDetails.specialtyid,
               recordinfo: {
                  hash: recordDetails.hash,
                  description: recordDetails.description
               }
            })
            /* 
               There should be tr_receipt status check 
               if (tr_receipt.processed.receipt.status === "executed")
            */
            status.isSuccess = true
            status.tr_receipt = tr_receipt
         }
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            status.msg = getErrMsgFromRpcErr(e)
         } else if (e.message) {
            status.msg = e.message
         } else {
            status.msg = 'Failed to push transaction'
         }
      }
      return status
   }

   read_records = async querryDetails => {
      const status = {
         isSuccess: false
      }
      try {
         if (!!!this.account) {
            status.msg = 'Failed to push transaction : Not connected to wallet'
         } else {
            const tr_receipt = await this._transaction(medicalContract.actions.readrecords, {
               perm: {
                  patient: querryDetails.patient,
                  doctor: this.account.name
               },
               specialtyids: querryDetails.specialtyids,
               interval: {
                  from: querryDetails.from,
                  to: querryDetails.to
               }
            })
            status.isSuccess = true
            status.tr_receipt = tr_receipt
         }
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            status.msg = getErrMsgFromRpcErr(e)
         } else if (e.message) {
            status.msg = e.message
         } else {
            status.msg = 'Failed to push transaction'
         }
      }
      return status
   }

   records_table = async () => {
      const status = {
         isSuccess: false
      }
      try {
         if (!!!this.account) {
            status.msg = 'Failed to push transaction : Not connected to wallet'
         } else {
            const tr_receipt = await this._transaction(medicalContract.actions.recordstab, {
               patient: this.account.name
            })
            status.isSuccess = true
            status.tr_receipt = tr_receipt
         }
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            status.msg = getErrMsgFromRpcErr(e)
         } else if (e.message) {
            status.msg = e.message
         } else {
            status.msg = 'Failed to push transaction'
         }
      }
      return status
   }

   deploy_contract = async filesContent => {
      const status = {
         isSuccess: false
      }
      try {
         if (!!!this.account) {
            status.msg = 'Failed to push transaction : Not connected to wallet'
         } else {
            /* Prepare wasm */
            const wasm = new Buffer(filesContent.wasm).toString('hex')
            /* Prepare abi */
            const buffer = new Serialize.SerialBuffer()
            let abi = JSON.parse(new Buffer(filesContent.abi).toString('utf8'))
            const abiDefinition = new Api({ rpc: this.rpc }).abiTypes.get('abi_def')
            abi = abiDefinition.fields.reduce(
               (acc, { name: fieldName }) =>
                  Object.assign(acc, { [fieldName]: acc[fieldName] || [] }),
               abi
            )
            abiDefinition.serialize(buffer, abi)
            abi = Buffer.from(buffer.asUint8Array()).toString(`hex`)

            //console.log(`wasm ${wasm.length} abi ${abi.length}`)

            /* Push transaction */
            const tr_receipt = await this.eos.transact(
               {
                  actions: [
                     /*
                     {
                        account: 'eosio',
                        name: 'setcode',
                        authorization: [
                           {
                              actor: this.account.name,
                              permission: this.account.authority
                           }
                        ],
                        data: {
                           account: this.account.name,
                           vmtype: 0,
                           vmversion: 0,
                           code: wasm
                        },
                     },
                     */
                     {
                        account: 'eosio',
                        name: 'setabi',
                        authorization: [
                           {
                              actor: this.account.name,
                              permission: this.account.authority
                           }
                        ],
                        data: {
                           account: this.account.name,
                           abi: abi,
                        },
                     }

                  ],
               },
               {
                  blocksBehind: 3,
                  expireSeconds: 30,
               }
            )
            status.isSuccess = true
            status.tr_receipt = tr_receipt
         }
      } catch (e) {
         console.error(e)
         if (e instanceof RpcError) {
            status.msg = getErrMsgFromRpcErr(e)
         } else if (e.message) {
            status.msg = e.message
         } else {
            status.msg = 'Failed to push transaction'
         }
      }
      return status
   }
}

export const eosio_client = new EOSIOWalletClient(medicalContract.account)

eosio_client.load_rigths_to_nomenclator(() => { }, msg => { })
eosio_client.load_specialities_to_nomenclator(() => { }, msg => { })