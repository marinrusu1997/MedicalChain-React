export const isHostValid = host => {
   const ip_regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
   if (ip_regex.test(host)) {
      return true
   } else {
      const url_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
      if (url_regex.test(host)) {
         return true
      }
   }
   return false
}

export const isPortValid = port => {
   if (port.length !== 0 && parseInt(port) !== 0)
      return true
   return false
}

export const isChainIdValid = chain_id => {
   if (chain_id.length === 0 || chain_id.length === 64)
      return true
   return false
}