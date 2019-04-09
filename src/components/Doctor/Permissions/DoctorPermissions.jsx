import React from 'react'
import {
   MDBCard, MDBCardHeader, MDBCardBody, MDBBtn, MDBDataTable
} from 'mdbreact'
import { CheckForPermModal } from "./CheckForPermModal"
import { PatientAccountButton } from './PatientAccountButton'
import { CheckForPermBtn } from './CheckForPermBtn'
import { table_mapping } from './RequestsTableMapping'

import { check_if_has_req_perms } from './CheckForPermImpl'

export class DoctorPermissions extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         table: table_mapping,
         check_for_perm_modal: {
            isOpen: false
         }
      }

      this.permNomenclatoriesForModal = null
   }

   onRequestForPermsHandler = () => {

   }

   onRemoveRequestHandler = () => {

   }

   onCheckForPermsHandler = nomenclatories => {
      this.permNomenclatoriesForModal = nomenclatories
      this.onCheckForPermToggle()
   }

   onCheckForPermToggle = () => {
      this.setState({ check_for_perm_modal: { isOpen: !!!this.state.check_for_perm_modal.isOpen } })
   }

   render() {
      return (
         <React.Fragment>
            <CheckForPermModal
               isOpen={this.state.check_for_perm_modal.isOpen}
               toggle={this.onCheckForPermToggle}
               permNomenclatories={this.permNomenclatoriesForModal}
               onCheckForPerm={check_if_has_req_perms}
            />

            <MDBCard narrow>
               <MDBCardHeader className="view view-cascade gradient-card-header green darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                  <div>
                  </div>
                  <a href="#!" className="white-text mx-3">Requests for permissions Management</a>
                  <div>
                     <PatientAccountButton />
                     <CheckForPermBtn onCheckForPerms={this.onCheckForPermsHandler} />
                     <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onRequestForPermsHandler}>
                        <i className="fas fa-plus-circle mt-0"></i>
                     </MDBBtn>
                     <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onRemoveRequestHandler}>
                        <i className="fas fa-times-circle mt-0"></i>
                     </MDBBtn>
                  </div>
               </MDBCardHeader>
               <MDBCardBody cascade>
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
         </React.Fragment>
      )
   }
}