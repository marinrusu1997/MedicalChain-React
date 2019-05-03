import React from 'react'

export const table_model = [
   {
      label: [<i key="Specialities" className="fa fa-hospital-symbol mr-2 indigo-text" aria-hidden="true"></i>, 'Specialities'],
      field: 'specialities',
      sort: 'asc',
      width: 200
   },
   {
      label: [<i key="Right" className="fa fa-book-reader mr-2 indigo-text" aria-hidden="true"></i>, 'Right'],
      field: 'right',
      sort: 'asc',
      width: 35
   },
   {
      label: [<i key="Start time" className="fa fa-hourglass-start mr-2 indigo-text" aria-hidden="true"></i>, 'Start time'],
      field: 'start_time',
      sort: 'asc',
      width: 100
   },
   {
      label: [<i key="End time" className="fa fa-hourglass-end mr-2 indigo-text" aria-hidden="true"></i>, 'End time'],
      field: 'end_time',
      sort: 'asc',
      width: 100
   },
   {
      label: [<i key="Status" className="fa fa-tasks mr-2 indigo-text" aria-hidden="true"></i>, 'Status'],
      field: 'status',
      sort: 'asc',
      width: 100
   }
]