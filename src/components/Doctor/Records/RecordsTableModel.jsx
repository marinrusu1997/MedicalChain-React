import React from 'react'

const imageColor = "deep-orange-text"
const ariaHiddenParam = "true"

export const table_model = [
   {
      label: [<i key="Hash" className={`fa fa-fingerprint mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Hash'],
      field: 'hash',
      width: 200
   },
   {
      label: [<i key="Specialty" className={`fa fa-hospital-symbol mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Specialty'],
      field: 'specialty',
      sort: 'asc',
      width: 70
   },
   {
      label: [<i key="Timestamp" className={`far fa-clock mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Timestamp'],
      field: 'timestamp',
      sort: 'asc',
      width: 70
   },
   {
      label: [<i key="Doctor" className={`fa fa-user-md mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Doctor'],
      field: 'doctor',
      sort: 'asc',
      width: 100
   },
   {
      label: [<i key="Description" className={`fa fa-comment-medical mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Description'],
      field: 'description',
      sort: 'asc',
      width: 100
   },
   {
      label: [<i key="View" className={`far fa-eye mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'View'],
      field: 'view',
      sort: 'asc',
      width: 50
   }
]