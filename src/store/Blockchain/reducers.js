import { SPECIALITIES_BCHAIN_TABLE_LOADED, RIGHTS_BCHAIN_TABLE_LOADED } from './actions'

const defaultState = {
   rights: null,
   specialities: null
}

export const blockchainReducer = (state = defaultState, action) => {
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
      default:
         return state
   }
}