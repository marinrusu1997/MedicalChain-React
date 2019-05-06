import { eosio_client } from "../../../blockchain/eosio-wallet-client"

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
      actions.push(...(await eosio_client.actions(account, -1)).actions)
      let matchYearAndMonth = this._testAndGetActionsWhichMatchYearMonth(actions, year, month)
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

   static async loadActions(account) {
      console.log(await this.loadAllActions(account))
   }
}