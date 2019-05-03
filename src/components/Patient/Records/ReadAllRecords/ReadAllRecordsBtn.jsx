import React from 'react'
import { MDBBtn, MDBIcon } from "mdbreact";
import { ConfirmationModal } from '../../../Utils/ConfirmationModal';

export class ReadAllRecordsBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   togleModal = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   onDoctorFullNamesRequested = async () => {
      await this.props.onReadAllRecordsHandler(true)
      this.togleModal()
   }

   onDoctorAccountsOnly = async () => {
      await this.props.onReadAllRecordsHandler(false)
      this.togleModal()
   }

   render() {
      return (
         <React.Fragment>
            <ConfirmationModal
               isOpen={this.state.modal.isOpen}
               toggle={this.togleModal}
               text={{
                  title: <p><MDBIcon icon="briefcase-medical" /> Read all records</p>,
                  body: 'Do you want to display doctor full names instead of their blockchain accounts?',
                  pos_choice_btn: 'Yes',
                  neg_choice_btn: 'No'
               }}
               choice
               pos_ch_handler={this.onDoctorFullNamesRequested}
               neg_ch_handler={this.onDoctorAccountsOnly}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.togleModal}>
               <i className="fa fa-book-medical"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}