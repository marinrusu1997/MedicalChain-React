import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBIcon } from 'mdbreact';
import { StepperHorizontal } from '../../Utils/StepperHorizontal';
import { FillFormCard } from './FillFormCard';
import { StoreOwnerKeyCard } from './StoreOwnerKeyCard';
import { StoreActiveKeyCard } from './StoreActiveKeyCard';
import { BackUpKeysCard } from './BackUpKeysCard';

export class InstructionModal extends Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: true
      }
   }

   toggle = () => {
      this.setState({
         modal: !this.state.modal
      })
   }

   render() {
      const steps =
         [
            { title: 'Step 1', component: <FillFormCard /> },
            { title: 'Step 2', component: <StoreOwnerKeyCard /> },
            { title: 'Step 3', component: <StoreActiveKeyCard /> },
            { title: 'Step 4', component: <BackUpKeysCard /> }
         ]

      return (
         <MDBContainer>
            <MDBModal isOpen={this.state.modal} cascading size="lg">
               <MDBModalHeader
                  titleClass="d-inline title"
                  className="text-center green darken-2 white-text"
               >
                  <MDBIcon icon="chalkboard-teacher" />&nbsp;&nbsp;Registration Instruction
               </MDBModalHeader>
               <MDBModalBody>
                  <StepperHorizontal steps={steps} onStepsDone={this.toggle}/>
               </MDBModalBody>
            </MDBModal>
         </MDBContainer>
      );
   }
}
