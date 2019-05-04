import {
   IDENTIFICATION_SERVICE_ADR_CHANGED,
   WALLET_SERVICE_ADD_CHANGED
} from "./actions"

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const defaultState = {
   indentification_address: 'http://127.0.0.1:7080',
   wallet_address: 'http://127.0.0.1:6080'
}

const _servicesReducer = (state = defaultState, action) => {
   switch (action.type) {
      case IDENTIFICATION_SERVICE_ADR_CHANGED:
         return {
            ...state,
            indentification_address: action.payload
         }
      case WALLET_SERVICE_ADD_CHANGED:
         return {
            ...state,
            wallet_address: action.payload
         }
      default:
         return state
   }
}

const servicesPersistConfig = {
   key: 'services',
   storage: storage,
   whitelist: ['indentification_address', 'wallet_address']
}

export const servicesReducer = persistReducer(servicesPersistConfig, _servicesReducer)