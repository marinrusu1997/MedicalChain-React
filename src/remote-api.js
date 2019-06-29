import { store } from "./store/";

export const identification_service = {
   baseUrl: store.getState().services.indentification_address,
   registerPatient: {
      method: 'post',
      api: '/patient/register'
   },
   registerDoctor: {
      method: 'post',
      api: '/doctor/register'
   },
   doctorNamesFromAcc: {
      method: 'post',
      api: '/doctor/full-names'
   },
   doctorsInfoFromFullName: {
      method: 'post',
      api: '/doctor/info-from-full-name'
   },
   patientFullNameFromAcc: {
      method: 'post',
      api: '/patient/full-name'
   },
   patientAccFromFullName: {
      method: 'post',
      api: '/patient/acc-from-full-name'
   }
}

export const wallet_service = {
   baseUrl: store.getState().services.wallet_address,
   store: {
      encryption: {
         method: 'post',
         api: '/store/encryption'
      },
      records: {
         method: 'post',
         api: '/store/records'
      }
   },
   retrieve: {
      encryption: {
         method: 'post',
         api: '/retrieve/encryption'
      },
      records: {
         method: 'post',
         api: '/retrieve/records'
      }
   }
}