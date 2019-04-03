import {
   ACCOUNT_CREATED_SUCCESSFULLY,
   ACCOUNT_INFO_HAS_BEEN_SEEN_AFTER_REGISTR
} from './actions'

const defaultState = {
   showDetails: false,
   accountDetails: {
      name: '',
      keys: {
         owner: '',
         active: '',
         encryption: ''
      },
      transaction: {
         id: '',
         status: '',
         cpu_usage_us: 0,
         net_usage_words: 0,
         block_time: '',
         block_num: 0
      }
   }
}

export const accountDisplayReducer = (state = defaultState, action) => {
   switch (action.type) {
      case ACCOUNT_CREATED_SUCCESSFULLY:
         return {
            showDetails: true,
            accountDetails: action.payload
         }
      case ACCOUNT_INFO_HAS_BEEN_SEEN_AFTER_REGISTR:
         return {
            showDetails: false,
            accountDetails: defaultState.accountDetails
         }
      default: {
         return state;
      }
   }
}