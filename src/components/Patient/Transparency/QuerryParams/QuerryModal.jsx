import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import { QuerryForm } from './QuerryForm';
import { validateQuerryParams } from './QuerryParamsValidator';

export class QuerryModal extends React.Component {

   constructor(props) {
      super(props)
      this.querryParams = {}
   }

   onInputChangeHandler = event => {
      this.querryParams[event.target.name] = event.target.value
   }

   onTrackBtnHandler = () => {
      if (validateQuerryParams(this.querryParams)) {
         this.props.onQuerryParamsProvided(this.querryParams)
         this.props.toggle()
      }
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
            <MDBModalHeader
               toggle={this.props.toggle}
               titleClass="d-inline title"
               className="text-center gradient-card-header purple-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="laptop-medical" />  Track doctor actions
               </em>
            </MDBModalHeader>
            <MDBModalBody>
               <QuerryForm onInputChange={this.onInputChangeHandler}>
                  <div className="text-center">
                     <button className="btn btn-info" onClick={this.onTrackBtnHandler}>
                        Track
                     </button>
                  </div>
               </QuerryForm>
            </MDBModalBody>
         </MDBModal>
      )
   }
}