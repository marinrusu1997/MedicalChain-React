import React from 'react'
import { MDBDataTable } from "mdbreact"
import { table_model } from "./TableModel";

export class ReadActionsTable extends React.Component {
   render() {
      return (
         <MDBDataTable
            entriesOptions={[10, 20, 30, 40, 50]}
            infoLabel={["Showing", "to", "of", "actions"]}
            tbodyColor="blue lighten-5"
            theadColor="purple lighten-5"
            responsive
            hover
            small
            data={{
               columns: table_model,
               rows: this.props.rows
            }}
         />
      )
   }
}