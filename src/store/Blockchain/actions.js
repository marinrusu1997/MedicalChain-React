export const SPECIALITIES_BCHAIN_TABLE_LOADED = 'SPECIALITIES_BCHAIN_TABLE_LOADED'
export const RIGHTS_BCHAIN_TABLE_LOADED = 'RIGHTS_BCHAIN_TABLE_LOADED'
export const BCHAIN_NODE_ENDPOINT_CONFIG_SETUP = 'BCHAIN_NODE_ENDPOINT_CONFIG_SETUP'
export const BCHAIN_CHAIN_ID_LOADED = 'BCHAIN_CHAIN_ID_LOADED'

export const bchainNodeEndpointConfigSelected = config => {
   return {
      type: BCHAIN_NODE_ENDPOINT_CONFIG_SETUP,
      payload: config
   }
}

export const bchainChainIdLoaded = chain_id => ({
   type: BCHAIN_CHAIN_ID_LOADED,
   payload: chain_id
})

export const specialitiesBchainTableLoaded = table => {
   return {
      type: SPECIALITIES_BCHAIN_TABLE_LOADED,
      payload: table
   }
}

export const rightsBchainTableLoaded = table => {
   return {
      type: RIGHTS_BCHAIN_TABLE_LOADED,
      payload: table
   }
}