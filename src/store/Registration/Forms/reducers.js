import { combineReducers } from 'redux'
import { patientFormReducer } from './Patient/reducers'

export const formsReducers = combineReducers({
   patient: patientFormReducer
})