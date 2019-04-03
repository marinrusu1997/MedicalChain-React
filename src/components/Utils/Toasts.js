import React from 'react'
import { MDBIcon, toast } from "mdbreact"

const InfoMsg = ({ closeToast, msg }) => (
   <p><MDBIcon icon="info-circle" /> {msg} </p>
)
export const infoToast = msg => {
   return toast.info(<InfoMsg msg={msg} />, {
      newestOnTop: true,
      autoClose: 5000
   })
}

const WarnMsg = ({ closeToast, msg }) => (
   <p><MDBIcon icon="exclamation-triangle" /> {msg} </p>
)
export const warnToast = msg => {
   return toast.info(<WarnMsg msg={msg} />, {
      newestOnTop: true,
      autoClose: 5000
   })
}

const ErrMsg = ({ closeToast, msg }) => (
   <p><MDBIcon icon="shield-alt" /> {msg}</p>
)
export const errorToast = msg => {
   return toast.error(<ErrMsg msg={msg} />, {
      newestOnTop: true,
      autoClose: 5000
   })
}

const SuccMsg = ({ closeToast, msg }) => (
   <p><MDBIcon icon="check" /> {msg} </p>
)
export const succToast = msg => {
   return toast.success(<SuccMsg msg={msg} />, {
      newestOnTop: true,
      autoClose: 5000
   })
}
