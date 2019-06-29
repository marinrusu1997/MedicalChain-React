import React from 'react'
import { MDBBtn } from "mdbreact";
import { ViewDoctorDetailsModal } from './ViewDoctorDetailsModal';

export class ViewDoctorDetailsBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   toggle = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   render() {
      return (
         <React.Fragment>
            <ViewDoctorDetailsModal
               isOpen={this.state.modal.isOpen}
               toggle={this.toggle}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.toggle}>
               <i className="fa fa-user-circle"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}