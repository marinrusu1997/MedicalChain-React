import {
   SPECIALITIES_BCHAIN_TABLE_LOADED,
   RIGHTS_BCHAIN_TABLE_LOADED,
   BCHAIN_NODE_ENDPOINT_CONFIG_SETUP
} from './actions'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const defaultState = {
   rights: null,
   specialities: null,
   config: {
      blockchain: 'eos',
      chainId: '',
      host: '127.0.0.1',
      port: 8989,
      protocol: 'http'
   }
}

const _blockchainReducer = (state = defaultState, action) => {
   switch (action.type) {
      case RIGHTS_BCHAIN_TABLE_LOADED:
         return {
            ...state,
            rights: action.payload
         }
      case SPECIALITIES_BCHAIN_TABLE_LOADED:
         return {
            ...state,
            specialities: action.payload
         }
      case BCHAIN_NODE_ENDPOINT_CONFIG_SETUP:
         return {
            ...state,
            config: action.payload
         }
      default:
         return state
   }
}

const bchainPersistConfig = {
   key: 'blockchain',
   storage: storage,
   whitelist: ['config']
}

export const blockchainReducer = persistReducer(bchainPersistConfig, _blockchainReducer)