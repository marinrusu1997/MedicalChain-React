import React from 'react'

export const table_mapping = {
   columns: [
      {
         label: [<i key="Remove" className="fa fa-edit mr-2 indigo-text" aria-hidden="true"></i>, 'Remove'],
         field: 'remove',
         width: 50
      },
      {
         label: [<i key="Time of request" className="fa fa-clock mr-2 indigo-text" aria-hidden="true"></i>, 'Time of request'],
         field: 'time_of_request',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="Patient" className="fa fa-user-tie mr-2 indigo-text" aria-hidden="true"></i>, 'Patient'],
         field: 'patient',
         sort: 'asc',
         width: 150
      },
      {
         label: [<i key="Right" className="fa fa-book-reader mr-2 indigo-text" aria-hidden="true"></i>, 'Right'],
         field: 'right',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="Specialities" className="fa fa-hospital-symbol mr-2 indigo-text" aria-hidden="true"></i>, 'Specialities'],
         field: 'specialties',
         sort: 'asc',
         width: 200
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
         width: 50
      }
   ],
   rows: []
}