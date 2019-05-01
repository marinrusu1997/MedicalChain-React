import React from 'react'
import { MDBBtn } from "mdbreact";
import { ReadRecordsModal } from "./ReadRecordsModal";

export class ReadRecordsBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   onModalTogle = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   onReadRecordsHandler = params => {
      console.log(params)
   }

   render() {
      return (
         <React.Fragment>
            <ReadRecordsModal
               isOpen={this.state.modal.isOpen}
               toggle={this.onModalTogle}
               onAddRecordClick={this.onReadRecordsHandler}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onModalTogle}>
               <i className="fa fa-notes-medical"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}