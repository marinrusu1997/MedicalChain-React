import {
   USER_LOGGED_IN,
   USER_LOGGED_OUT,
   USER_TYPE_WAS_SELECTED,
   USER_TYPE_WAS_UNSELECTED,
   USER_TYPE_DEFAULT
} from "./actions";

const defaultState = {
   userName: null,
   currentUserType: USER_TYPE_DEFAULT,
   isUserLoggedIn: false,
}

export const appReducer = (state = defaultState, action) => {
   switch (action.type) {
      case USER_LOGGED_IN:
         return {
            userName: action.payload.userName,
            currentUserType: action.payload.userType,
            isUserLoggedIn: true
         }
      case USER_LOGGED_OUT:
         return {
            userName: null,
            currentUserType: USER_TYPE_DEFAULT,
            isUserLoggedIn: false
         }
      case USER_TYPE_WAS_SELECTED:
         return {
            ...state,
            currentUserType: action.payload
         }
      case USER_TYPE_WAS_UNSELECTED:
         return {
            ...state,
            currentUserType: USER_TYPE_DEFAULT
         }
      default:
         return state;
   }
}
