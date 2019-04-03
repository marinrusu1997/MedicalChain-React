export const ACCOUNT_CREATED_SUCCESSFULLY = 'ACCOUNT_CREATED_SUCCESSFULLY'
export const ACCOUNT_INFO_HAS_BEEN_SEEN_AFTER_REGISTR = 'ACCOUNT_INFO_HAS_BEEN_SEEN_AFTER_REGISTR'

export const accountCreatedSuccessfullyAction = accountDetails => {
   return {
      type: ACCOUNT_CREATED_SUCCESSFULLY,
      payload: accountDetails
   }
}

export const accountInfoHasBeenSeenAction = () => {
   return {
      type: ACCOUNT_INFO_HAS_BEEN_SEEN_AFTER_REGISTR
   }
}