import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact'

export class ConfirmationModal extends Component {
   render() {
      return (
         <MDBContainer>
            <MDBModal isOpen={this.props.isOpen} toggle={this.props.toggle} cascading>
               <MDBModalHeader
                  toggle={this.props.toggle}
                  titleClass="d-inline title"
                  className="text-center gradient-card-header peach-gradient darken-2 white-text">
                  {this.props.text.title}
               </MDBModalHeader>
               <MDBModalBody>
                  <center>{this.props.text.body}</center>
               </MDBModalBody>
               <MDBModalFooter>
                  {this.props.info &&
                     <MDBBtn color="secondary" onClick={this.props.info_handler}>{this.props.text.info_btn}</MDBBtn>
                  }
                  {this.props.choice &&
                     <p style={{ 'margin': 'auto', 'padding': '10px' }}>
                        <MDBBtn color="success" onClick={this.props.pos_ch_handler}>{this.props.text.pos_choice_btn}</MDBBtn>
                        <MDBBtn color="danger" onClick={this.props.neg_ch_handler}>{this.props.text.neg_choice_btn}</MDBBtn>
                     </p>
                  }
               </MDBModalFooter>
            </MDBModal>
         </MDBContainer>
      );
   }
}