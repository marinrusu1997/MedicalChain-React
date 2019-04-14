import { eosio_client } from '../../../../blockchain/eosio-wallet-client'

const tryLoadPatientPerms = async (patient, onFail) => {
   try {
      const _patients = await eosio_client.patients_by_scope(patient)
      if (!!!_patients.rows.length) {
         onFail("Seems that this patient account was not registered yet")
         return null
      }
      if (!!!_patients.rows[0].perms.length) {
         onFail("This patient don't have any permissions")
         return null
      }
      const noOfPerms = _patients.rows[0].perms.reduce((accumulator, current) => accumulator + current.value.length, 0)
      const _perms = await eosio_client.permissions_by_scope(noOfPerms, patient)
      if (_perms.more) {
         onFail('Some permissions have remained unloaded from the blockchain')
      }
      return {
         perms: _patients.rows[0].perms,
         perms_info: _perms.rows
      }
   } catch (e) {
      console.error(e)
      onFail('Failed to load patient permissions')
      return null
   }
}

const retrieveDoctorPerms = patient_perms => {
   const doctor_perms = {
      account: eosio_client.getAccountName(),
      perms: null
   }
   for (const curr_doctor_perm of patient_perms.perms) {
      if (curr_doctor_perm.key === doctor_perms.account) {
         doctor_perms.perms = curr_doctor_perm.value
         break
      }
   }
   return doctor_perms.perms
}

const checkIfSpecialtyPresentInSpecialtySet = (id, specialtyset) => {
   let found = false
   for (const specialtyid of specialtyset) {
      if (specialtyid === id) {
         found = true
         break
      }
   }
   return found
}

const checkIfMatchInterval = (req_interval, curr_interval) => {
   if (curr_interval.from === 0 && curr_interval.to === 0)
      return true
   if (req_interval.from >= curr_interval.from && req_interval.to <= curr_interval.to)
      return true
   return false
}

const checkForRequestedPerms = (doctor_perms, permsInfo, req_perms, nomenclatories) => {
   const permsInfoMap = new Map()
   permsInfo.forEach(permInfo => {
      permsInfoMap.set(permInfo.id, permInfo)
   })

   const doctor_specialties_fulfilled = new Map()
   req_perms.specialtyids.forEach(specialtyid => doctor_specialties_fulfilled.set(specialtyid, false))

   doctor_perms.forEach(perm_id => {
      const curr_perm_info = permsInfoMap.get(perm_id)
      if (curr_perm_info.right === req_perms.rightid) {
         req_perms.specialtyids.forEach(specialtyid => {
            if (!!!doctor_specialties_fulfilled.get(specialtyid) && checkIfSpecialtyPresentInSpecialtySet(specialtyid, curr_perm_info.specialtyids)) {
               if (checkIfMatchInterval(req_perms.interval, curr_perm_info.interval)) {
                  doctor_specialties_fulfilled.set(specialtyid, true);
               }
            }
         })
      }
   })

   let unfulfilledMsg = "You don't have permissions for following specialities: "

   for (const [specialtyid, fulfilled] of doctor_specialties_fulfilled) {
      if (!!!fulfilled) {
         unfulfilledMsg = unfulfilledMsg.concat(nomenclatories.specialitiesNomenclatory.get(specialtyid), ", ")
      }
   }

   if (unfulfilledMsg !== "You don't have permissions for following specialities: ") {
      return {
         success: false,
         msg: unfulfilledMsg
      }
   } else {
      return {
         success: true,
         msg: 'All requirements are fulfilled'
      }
   }
}

export const check_if_has_req_perms = (nomenclatories, onSucc, onFail) => async req_perms => {
   const patient_perms = await tryLoadPatientPerms(req_perms.patient, onFail)
   if (!!!patient_perms)
      return
   const doctor_perms = retrieveDoctorPerms(patient_perms)
   if (!!!doctor_perms) {
      onFail("You don't have any permissions at all for this patient")
      return
   }
   const result = checkForRequestedPerms(doctor_perms, patient_perms.perms_info, req_perms, nomenclatories)
   if (result.success)
      onSucc(result.msg)
   else
      onFail(result.msg)
}