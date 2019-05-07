import React from 'react'

const imageColor = "teal-text"
const ariaHiddenParam = "true"

export const table_model = [
   {
      label: [<i key="Authorizations" className={`fa fa-id-card mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Authorizations'],
      field: 'authorizations',
      width: 100
   },
   {
      label: [<i key="Record Hash" className={`fa fa-fingerprint mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Record Hash'],
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
      label: [<i key="Block Time" className={`far fa-clock mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Block Time'],
      field: 'block_time',
      sort: 'asc',
      width: 70
   },
   {
      label: [<i key="Block Num" className={`fa fa-link mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Block Num'],
      field: 'block_num',
      sort: 'asc',
      width: 20
   },
   {
      label: [<i key="Transaction Id" className={`fa fa-fingerprint mr-2 ${imageColor}`} aria-hidden={ariaHiddenParam}></i>, 'Transaction Id'],
      field: 'trx_id',
      sort: 'asc',
      width: 100
   }
]