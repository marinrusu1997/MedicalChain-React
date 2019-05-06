import { eosio_client } from "../../../blockchain/eosio-wallet-client"
import { store } from "../../../store/"

export class TransparencyLogic {

   static async loadAllActions(account) {
      let actions = []
      actions.push(...(await eosio_client.actions(account, -1)).actions)
      if (actions.length === 0) {
         return actions
      }
      if (actions[0].account_action_seq !== 0) {
         const missingActions = (await eosio_client.actions(account, 0, actions[0].account_action_seq - 1)).actions
         actions = missingActions.concat(actions)
      }
      return actions
   }

   static _testAndGetActionsWhichMatchYearMonth(actions, year, month) {
      const result = {
         done: false,
         actions: []
      }
      const requestTimeStr = year + "-" + month
      if (actions.length === 0) {
         result.done = true
         return result
      }
      if (actions[0].block_time.substr(0, 7) === requestTimeStr) {
         result.actions = actions
         return result
      } else {
         result.done = true
         for (const action of actions) {
            if (action.block_time.substr(0, 7) === requestTimeStr) {
               result.actions.push(action)
            }
         }
         return result
      }
   }

   static async loadAllActionsByYearAndMonth(account, year, month) {
      let actions = []
      let matchYearAndMonth = this._testAndGetActionsWhichMatchYearMonth((await eosio_client.actions(account, -1)).actions, year, month)
      actions = matchYearAndMonth.actions.concat(actions)
      let pos = 0
      while (!!!matchYearAndMonth.done) {
         pos = actions[0].account_action_seq - 1
         if (pos !== -1) {
            matchYearAndMonth = this._testAndGetActionsWhichMatchYearMonth(
               (await eosio_client.actions(account, pos, -20)).actions,
               year, month
            )
            actions = matchYearAndMonth.actions.concat(actions)
         } else {
            break;
         }
      }
      return actions
   }

   static getSpecialitiesNomenclatory = () => {
      const specialties_nomenclatory = store.getState().blockchain.specialities
      if (!!!specialties_nomenclatory) {
         throw new Error("Specialities nomenclatory is not loaded")
      }
      return specialties_nomenclatory
   }

   static filterWriteRecordActions = (patient, actions) => {
      const specialties_nomenclatory = this.getSpecialitiesNomenclatory()
      const writeActions = []
      actions.forEach(action => {
         if (action.action_trace.act.name === 'writerecord' && action.action_trace.act.data.perm.patient === patient) {
            const authorizations = []
            action.action_trace.act.authorization.forEach(authorization => {
               authorizations.push({
                  actor: authorization.actor,
                  permission: authorization.permission
               })
            })
            writeActions.push({
               authorizations: authorizations,
               hash: action.action_trace.act.data.recordinfo.hash,
               specialty: specialties_nomenclatory.get(action.action_trace.act.data.specialtyid),
               block_time: action.block_time,
               block_num: action.block_num,
               trx_id: action.action_trace.trx_id
            })
         }
      })
      return writeActions
   }

   static filterReadRecordsActions = (patient, actions) => {
      const specialties_nomenclatory = this.getSpecialitiesNomenclatory()
      const readActions = []
      actions.forEach(action => {
         if (action.action_trace.act.name === 'readrecords' && action.action_trace.act.data.perm.patient === patient) {
            const authorizations = []
            action.action_trace.act.authorization.forEach(authorization => {
               authorizations.push({
                  actor: authorization.actor,
                  permission: authorization.permission
               })
            })
            readActions.push({
               authorizations: authorizations,
               start_time: new Date(action.action_trace.act.data.interval.from * 1000),
               end_time: new Date(action.action_trace.act.data.interval.to * 1000),
               specialities: action.action_trace.act.data.specialtyids.map(id => specialties_nomenclatory.get(id)),
               block_time: action.block_time,
               block_num: action.block_num,
               trx_id: action.action_trace.trx_id
            })
         }
      })
      return readActions
   }

}