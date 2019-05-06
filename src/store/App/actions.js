//@ts-check
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const USER_TYPE_WAS_SELECTED = 'USER_TYPE_WAS_SELECTED'
export const USER_TYPE_WAS_UNSELECTED = 'USER_TYPE_NEEDS_RESELECT'
export const USER_TYPE_DEFAULT = ''
export const USER_TYPE_PATIENT = 'USER_TYPE_PATIENT'
export const USER_TYPE_MEDIC = 'USER_TYPE_MEDIC'
export const USER_TYPE_ADMIN = 'USER_TYPE_ADMIN'

export const userLoggedIn = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user
  }
}

export const userLoggedOut = () => {
  return {
    type: USER_LOGGED_OUT,
    payload: USER_TYPE_DEFAULT
  }
}

export const selectCurrentUserType = userType => {
  return {
    type: USER_TYPE_WAS_SELECTED,
    payload: userType
  }
}

export const unselectCurrentUserType = () => {
  return {
    type: USER_TYPE_WAS_UNSELECTED
  }
}
