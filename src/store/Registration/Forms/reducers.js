import { combineReducers } from 'redux'
import { patientFormReducer } from './Patient/reducers'
import { doctorFormReducer } from './Doctor/reducers'

export const formsReducers = combineReducers({
   patient: patientFormReducer,
   doctor: doctorFormReducer
})