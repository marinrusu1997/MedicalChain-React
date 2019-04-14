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
   }
}