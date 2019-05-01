import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import { ReadRecordsForm } from "./ReadRecordsForm";

export class ReadRecordsModal extends React.Component {

   onReadBtnClickHandler = () => {
      console.log("Read")
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
            <MDBModalHeader
               toggle={this.props.toggle}
               titleClass="d-inline title"
               className="text-center gradient-card-header purple-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="briefcase-medical" /> Read Medical Records
            </em>
            </MDBModalHeader>
            <MDBModalBody>
               <ReadRecordsForm>
                  <div className="text-center">
                     <button className="btn btn-info" onClick={this.onReadBtnClickHandler}>
                        Read
                     </button>
                  </div>
               </ReadRecordsForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}