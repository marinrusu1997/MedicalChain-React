export const server = {
   baseUrl: 'http://localhost:8080',
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
   patientFullNameFromAcc: {
      method: 'post',
      api: '/patient/full-name'
   },
   patientAccFromFullName: {
      method: 'post',
      api: '/patient/acc-from-full-name'
   }
}

export const wallet = {
   baseUrl: 'http://localhost:6080',
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