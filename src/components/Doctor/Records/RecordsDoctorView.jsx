import React from 'react'
import { MDBCard, MDBCardHeader, MDBCardBody, MDBDataTable } from "mdbreact"
import { AddRecordBtn } from './AddRecord/AddRecordBtn';
import { ReadRecordsBtn } from './ReadRecords/ReadRecordsBtn';
import { table_model } from './RecordsTableModel';

export class RecordsDoctorView extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         patient: {
            account: null,
            fullName: null
         },
         table: {
            columns: table_model,
            rows: []
         }
      }
   }

   render() {
      return (
         <MDBCard narrow>
            <MDBCardHeader className="view view-cascade gradient-card-header peach-gradient darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
               <div>
               </div>
               <a href="#!" className="white-text mx-3">Patients Records Management</a>
               <div>
                  <AddRecordBtn />
                  <ReadRecordsBtn />
               </div>
            </MDBCardHeader>
            <MDBCardBody cascade>
               <center><font color="black">{this.state.patient.fullName || this.state.patient.account}</font></center>
               <MDBDataTable
                  entriesOptions={[10, 20, 30, 40, 50]}
                  infoLabel={["Showing", "to", "of", "requests"]}
                  tbodyColor="blue lighten-5"
                  theadColor="purple lighten-5"
                  responsive
                  hover
                  small
                  data={this.state.table}
               />
            </MDBCardBody>
         </MDBCard>
      )
   }
}