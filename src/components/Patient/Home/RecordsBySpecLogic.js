import { ReadRecordsLogic } from "../Records/ReadRecordsLogic"
import { store } from "../../../store/"
import { errorToast } from "../../Utils/Toasts"

export class RecordsBySpecLogic {

   static _getSpecialitiesNomenclatory() {
      const specialties_nomenclatory = store.getState().blockchain.specialities
      if (!!!specialties_nomenclatory) {
         throw new Error("Specialities nomenclatory is not loaded")
      }
      return specialties_nomenclatory
   }

   static async getRecordsBySpecialities() {
      const recordsBySpec = {
         labels: [],
         data: []
      }
      try {
         const specialties_nomenclatory = this._getSpecialitiesNomenclatory()
         const records_table = await ReadRecordsLogic.readRecordsMetadataFromBchainAsPatient()
         let recordsPerSpec = null
         specialties_nomenclatory.forEach((name, id) => {
            recordsBySpec.labels.push(name)
            recordsPerSpec = records_table[name]
            recordsBySpec.data.push(recordsPerSpec ? recordsPerSpec.length : 0)
         })
      } catch (e) {
         errorToast(e.message)
      }
      return recordsBySpec
   }
}