import { combineReducers } from 'redux'
import { appReducer } from './App/reducers'
import { registrationReducer } from './Registration/reducers'
import { blockchainReducer } from './Blockchain/reducers'

export default combineReducers({
   app: appReducer,
   blockchain: blockchainReducer,
   registration: registrationReducer
})
