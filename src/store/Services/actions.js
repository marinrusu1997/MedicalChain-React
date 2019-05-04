export const IDENTIFICATION_SERVICE_ADR_CHANGED = 'IDENTIFICATION_SERVICE_ADR_CHANGED'
export const WALLET_SERVICE_ADD_CHANGED = 'WALLET_SERVICE_ADD_CHANGED'

export const setIdentificationServiceAddr = addr => ({
   type: IDENTIFICATION_SERVICE_ADR_CHANGED,
   payload: addr
})

export const setWalletServiceAddr = addr => ({
   type: WALLET_SERVICE_ADD_CHANGED,
   payload: addr
})