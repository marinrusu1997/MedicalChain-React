import React from 'react'

export const table_mapping = {
   columns: [
      {
         label: [<i key="Change" className="fa fa-edit mr-2 teal-text" aria-hidden="true"></i>, 'Change'],
         field: 'change',
         width: 50
      },
      {
         label: [<i key="Specialty" className="fa fa-hospital-symbol mr-2 teal-text" aria-hidden="true"></i>, 'Specialty'],
         field: 'specialties',
         sort: 'asc',
         width: 200
      },
      {
         label: [<i key="Doctor" className="fa fa-user-md mr-2 teal-text" aria-hidden="true"></i>, 'Doctor'],
         field: 'doctor',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="Account" className="fa fa-user-circle mr-2 teal-text" aria-hidden="true"></i>, 'Account'],
         field: 'account',
         sort: 'asc',
         width: 50
      },
      {
         label: [<i key="Right" className="fa fa-book-reader mr-2 teal-text" aria-hidden="true"></i>, 'Right'],
         field: 'right',
         sort: 'asc',
         width: 35
      },
      {
         label: [<i key="Start time" className="fa fa-hourglass-start mr-2 teal-text" aria-hidden="true"></i>, 'Start time'],
         field: 'start_time',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="End time" className="fa fa-hourglass-end mr-2 teal-text" aria-hidden="true"></i>, 'End time'],
         field: 'end_time',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="Status" className="fa fa-tasks mr-2 teal-text" aria-hidden="true"></i>, 'Status'],
         field: 'status',
         sort: 'asc',
         width: 100
      }
   ],
   rows: []
}