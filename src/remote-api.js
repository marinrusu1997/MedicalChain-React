export const validationService = {
   baseUrl: 'http://localhost:8080',
   validatePatientIdentity: {
      method: 'post',
      api: '/patient/validate-identity'
   },
   validateDoctorIdentity: {
      method: 'post',
      api: '/doctor/validate-identity'
   }
}