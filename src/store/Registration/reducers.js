import { combineReducers } from 'redux'
import { accountDisplayReducer } from './Account Display/reducers'
import { formsReducers } from './Forms/reducers'
import { signUpHeaderReducer } from './Sign Up Header/reducers'

export const registrationReducer = combineReducers({
   accountDisplay: accountDisplayReducer,
   forms: formsReducers,
   signUpHeader: signUpHeaderReducer
})