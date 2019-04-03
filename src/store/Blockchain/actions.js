export const SPECIALITIES_BCHAIN_TABLE_LOADED = 'SPECIALITIES_BCHAIN_TABLE_LOADED'
export const RIGHTS_BCHAIN_TABLE_LOADED = 'RIGHTS_BCHAIN_TABLE_LOADED'

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