import { eosio_client } from "../../blockchain/eosio-wallet-client";
import { store } from "../../store";

export class RequestPatientPermsLogic {

   static _tryFindDoctorPerms = patient_table => {
      let doctorPerms = null
      const doctor_acc = eosio_client.getAccountName()
      for (const permObj of patient_table.rows[0].perms) {
         if (permObj.key === doctor_acc) {
            doctorPerms = permObj.value
            break
         }
      }
      if (!!!doctorPerms) {
         throw new Error('This patient did not provide you any permissions')
      }
      return doctorPerms
   }

   static _getNumberOfPerms = patient_table => {
      return patient_table.rows[0].perms.reduce((accumulator, current) => accumulator + current.value.length, 0)
   }

   static _getPatientPermsTable = async (patient_table, account) => {
      const patient_perms_table = await eosio_client.permissions_by_scope(this._getNumberOfPerms(patient_table), account)
      if (patient_perms_table.more) {
         throw new Error('Some permissions have remained unloaded from the blockchain')
      }
      return patient_perms_table
   }

   static _getNormalizedDateTime = posix => {
      const date = new Date(posix * 1000)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return date.toJSON().slice(0, 10) + "T" + (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes)
   }

   static _getTimestampsDifference = (date1, date2) => {
      let difference = date1.getTime() - date2.getTime();

      const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
      difference -= daysDifference * 1000 * 60 * 60 * 24

      const hoursDifference = Math.floor(difference / 1000 / 60 / 60);
      difference -= hoursDifference * 1000 * 60 * 60

      const minutesDifference = Math.floor(difference / 1000 / 60);
      difference -= minutesDifference * 1000 * 60

      const secondsDifference = Math.floor(difference / 1000);

      return daysDifference + " days " + hoursDifference + " hours " + minutesDifference + " minutes " + secondsDifference + " seconds"
   }

   static _getPermStatus = (interval, right) => {
      /*
          0 -> CONSULT
          1 -> ADD
          2 -> CONSULT & ADD
      */
      const currentTimeInSeconds = new Date().getTime() / 1000
      if (interval.to === 0 || right === 0) {
         return "AVAILABLE"
      } else if (right === 1) {
         if (interval.to <= currentTimeInSeconds) {
            return "EXPIRED"
         } else {
            return "REMAINS " + this._getTimestampsDifference(new Date(interval.to * 1000), new Date(currentTimeInSeconds * 1000))
         }
      } else if (right === 2) {
         if (interval.to <= currentTimeInSeconds) {
            return "ONLY CONSULT"
         } else {
            return "ADD REMAINS " + this._getTimestampsDifference(new Date(interval.to * 1000), new Date(currentTimeInSeconds * 1000))
         }
      }
   }

   static _getNormalizedPerms = (doctorPermIds, patient_perms, nomenclatories) => {
      const normalizedPerms = []
      const permsMap = new Map()
      let currentPerm = null
      patient_perms.forEach(permInfo => {
         permsMap.set(permInfo.id, permInfo)
      })
      doctorPermIds.forEach(perm_id => {
         currentPerm = permsMap.get(perm_id)
         normalizedPerms.push({
            specialities: currentPerm.specialtyids.map(id => nomenclatories.specialities.get(id)).toString(),
            right: nomenclatories.rights.get(currentPerm.right),
            start_time: currentPerm.interval.from === 0 ? "INFINITE" : this._getNormalizedDateTime(currentPerm.interval.from),
            end_time: currentPerm.interval.to === 0 ? "INFINITE" : this._getNormalizedDateTime(currentPerm.interval.to),
            status: this._getPermStatus(currentPerm.interval, currentPerm.right)
         })
      })
      return normalizedPerms
   }

   static _getNomenclatories = () => {
      const rightsNomenclatory = store.getState().blockchain.rights
      if (!!!rightsNomenclatory) {
         throw new Error("Rights nomenclatory is not loaded. Please refresh the page")
      }
      const specialitiesNomenclatory = store.getState().blockchain.specialities
      if (!!!specialitiesNomenclatory) {
         throw new Error("Specialities nomenclatory is not loaded. Please refresh the page")
      }
      return {
         rights: rightsNomenclatory,
         specialities: specialitiesNomenclatory
      }
   }

   static getPermsFromBchain = async patient_account => {
      const nomeclatories = this._getNomenclatories()
      const patient_table = await eosio_client.patients_by_scope(patient_account)
      const doctorPermIds = this._tryFindDoctorPerms(patient_table)
      const patient_perms_table = await this._getPatientPermsTable(patient_table, patient_account)
      return this._getNormalizedPerms(doctorPermIds, patient_perms_table.rows, nomeclatories)
   }
}