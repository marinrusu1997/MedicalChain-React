export const ACCOUNT_CREATION_REQUEST_SENT = 'ACCOUNT_CREATION_REQUEST_SENT'
export const ACCOUNT_CREATION_RESPONSE_READY = 'ACCOUNT_CREATION_RESPONSE_READY'

export const accountCreationRequestSent = () => {
   return {
      type: ACCOUNT_CREATION_REQUEST_SENT
   }
}

export const accountCreationResponseReady = () => {
   return {
      type: ACCOUNT_CREATION_RESPONSE_READY
   }
}