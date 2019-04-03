import {
   ACCOUNT_CREATION_REQUEST_SENT,
   ACCOUNT_CREATION_RESPONSE_READY
} from './actions'

const defaultState = {
   isWaitingForRegisterResp: false
}

export const signUpHeaderReducer = (state = defaultState, action) => {
   switch (action.type) {
      case ACCOUNT_CREATION_REQUEST_SENT:
         return { isWaitingForRegisterResp: true }
      case ACCOUNT_CREATION_RESPONSE_READY:
         return { isWaitingForRegisterResp: false }
      default:
         return state
   }
}