import React from 'react'
import {
   MDBCard, MDBCardHeader, MDBCardBody, MDBDataTable
} from 'mdbreact'
import { CheckForPermModal } from "./CheckForPermissions/CheckForPermModal"
import { PatientAccountButton } from './PatientAccount/PatientAccountButton'
import { CheckForPermBtn } from './CheckForPermissions/CheckForPermBtn'
import { table_model } from './RequestsTableMapping'
import { errorToast, succToast } from "../../Utils/Toasts";

import { check_if_has_req_perms } from './CheckForPermissions/CheckForPermImpl'
import { PatientPermissionsBtn } from './PatientPermissions/PatientPermissionsBtn';
import { Footer } from '../../Utils/Footer';

export class DoctorPermissions extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         table: {
            columns: table_model,
            rows: []
         },
         check_for_perm_modal: {
            isOpen: false
         },
         patient: null
      }

      this.nomenclatories = null
      this.permNomenclatoriesForModal = null
   }

   onCheckForPermsBtnHandler = nomenclatories => {
      this.nomenclatories = nomenclatories
      this.permNomenclatoriesForModal = this.nomenclatories.reversed
      this.onCheckForPermToggle()
   }

   onCheckForPermToggle = () => {
      this.setState({ check_for_perm_modal: { isOpen: !!!this.state.check_for_perm_modal.isOpen } })
   }

   _doCheckForPerm = req_perm => {
      check_if_has_req_perms(
         this.nomenclatories.normal,
         msg => succToast(msg),
         msg => errorToast(msg)
      )(req_perm)
   }

   onRequestPatientPermsHandler = (perms, patient) => {
      this.setState({
         table: {
            columns: table_model,
            rows: perms
         },
         patient: patient
      })
   }

   render() {
      return (
         <React.Fragment>
            <CheckForPermModal
               isOpen={this.state.check_for_perm_modal.isOpen}
               toggle={this.onCheckForPermToggle}
               permNomenclatories={this.permNomenclatoriesForModal}
               onCheckForPerm={this._doCheckForPerm}
            />
            <MDBCard narrow>
               <MDBCardHeader className="view view-cascade gradient-card-header purple-gradient darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                  <div>
                  </div>
                  <a href="#!" className="white-text mx-3">Patient Permissions Management</a>
                  <div>
                     <PatientAccountButton />
                     <CheckForPermBtn onCheckForPerms={this.onCheckForPermsBtnHandler} />
                     <PatientPermissionsBtn onRequestPatientPerms={this.onRequestPatientPermsHandler} />
                  </div>
               </MDBCardHeader>
               <MDBCardBody cascade>
                  <center><font color="black">{this.state.patient}</font></center>
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
            <Footer />
         </React.Fragment>
      )
   }
}