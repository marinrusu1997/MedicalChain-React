import React from 'react'
import { MDBModal, MDBModalHeader, MDBModalBody, MDBIcon } from "mdbreact";
import { ReadRecordsForm } from "./ReadRecordsForm";
import { validateReadParams } from './ReadRecordsFormValidator';

export class ReadRecordsModal extends React.Component {

   constructor(props) {
      super(props)
      this.readRecordsParams = {}
   }

   onInputChangeHandler = event => {
      this.readRecordsParams[event.target.name] = event.target.value
   }

   _getNormalizedReadRecordsParams = () => ({
      patient: this.readRecordsParams.patient,
      specialtyids: this.readRecordsParams.specialities.map(specialty => this.props.specialitiesNomenclatory.reversed.get(specialty)),
      from: (Date.parse(this.readRecordsParams.start) / 1000).toFixed(0),
      to: (Date.parse(this.readRecordsParams.stop) / 1000).toFixed(0),
      doctor_full_name_flag: this.readRecordsParams.doctor_full_name_flag
   })

   onReadBtnClickHandler = () => {
      if (validateReadParams(this.readRecordsParams)) {
         this.props.onReadRecords(this._getNormalizedReadRecordsParams())
      }
   }

   render() {
      return (
         <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
            <MDBModalHeader
               toggle={this.props.toggle}
               titleClass="d-inline title"
               className="text-center gradient-card-header blue-gradient darken-2 white-text">
               <em>
                  <MDBIcon icon="briefcase-medical" /> Read Medical Records
            </em>
            </MDBModalHeader>
            <MDBModalBody>
               <ReadRecordsForm
                  specialitiesNomenclatory={this.props.specialitiesNomenclatory.reversed}
                  onInputChange={this.onInputChangeHandler}>
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