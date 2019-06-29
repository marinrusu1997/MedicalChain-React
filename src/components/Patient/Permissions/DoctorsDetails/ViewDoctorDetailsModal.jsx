import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import { SearchBar } from '../../../Utils/SearchBar';
import { getDoctorsInfoFromFullName } from "../../../../servers/identification";
import { errorToast } from "../../../Utils/Toasts";

export class ViewDoctorDetailsModal extends React.Component {

   makeDoctorSearchTerm = doctor_name => {
      const splitted_name = doctor_name.split(" ")
      return {
         surname: splitted_name[0],
         name: splitted_name.length >= 2 ? splitted_name[1] : null
      }
   }

   onNoResults = () => errorToast('No doctors with this full name. We remember you the input format: Surname Name')

   keyForResult = doctor => doctor.account

   renderResult = doctor => (
      <div>
         <MDBIcon icon="user-md" /><font color="#FF3800">&nbsp;Surname&nbsp;&nbsp;&nbsp;</font>
         <font color="black">{doctor.surname}</font>
         <br/>
         <MDBIcon icon="user-md" /><font color="#FF3800">&nbsp;Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
         <font color="black">{doctor.name}</font>
         <br/>
         <MDBIcon icon="user-circle" /><font color="#FF3800">&nbsp;Account&nbsp;&nbsp;&nbsp;&nbsp;</font>
         <font color="black">{doctor.account}</font>
         <br/>
         <MDBIcon icon="hospital-symbol" /><font color="#FF3800">&nbsp;Specialty&nbsp;&nbsp;&nbsp;</font>
         <font color="black">{doctor.specialty}</font>
      </div>
   )

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} cascading>
            <MDBModalHeader
               toggle={this.props.toggle}
               titleClass="d-inline title"
               className="text-center gradient-card-header purple-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="users" />  Doctors
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <SearchBar
                  title={<center>Search</center>}
                  searchPlaceholder="Surname and Name"
                  fetchResults={getDoctorsInfoFromFullName}
                  onNoResults={this.onNoResults}
                  keyForResult={this.keyForResult}
                  renderResult={this.renderResult}
                  makeSearchTerm={this.makeDoctorSearchTerm}
               />
            </MDBModalBody>
         </MDBModal>
      )
   }
}