import getIpfs from 'window.ipfs-fallback'
import { Buffer } from 'safe-buffer';

let ipfs = null

const getIpfsSingleton = async () => {
   if (!!!ipfs) {
      ipfs = await getIpfs()
   }
   return ipfs
}

export const storeFileToIPFS = async content => {
   try {
      const instance = await getIpfsSingleton()
      return await instance.add(Buffer.from(content))
   } catch (e) {
      console.error(e)
      throw new Error("Can't store file. Make sure you are connected to IPFS Node")
   }
}

export const retrieveFileFromIPFS = async hash => {
   try {
      const instance = await getIpfsSingleton()
      return (await instance.cat(hash)).toString('utf8')
   } catch (e) {
      console.error(e)
      throw new Error("Can't retrieve file. Make sure you are connected to IPFS Node")
   }
}

const retrieveObjectFromIPFS = async validCID => {
   const instance = await getIpfsSingleton()
   return instance.object.get(validCID)
}

const listFilesFromIPFSDir = async validCID => {
   const instance = await getIpfsSingleton()
   return instance.ls(validCID)
}

const retrieveFilesFromIPFS = async validCID => {
   const instance = await getIpfsSingleton()
   const files = await instance.get(validCID)
   files.forEach(file => {
      if (file.content) {
         file.content = file.content.toString('utf8')
      }
   })
   return files
}
