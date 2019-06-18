import React from 'react'
import Stepper from 'react-stepper-horizontal';
import { MDBBtn } from "mdbreact";

export class StepperHorizontal extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         steps: props.steps.map((step, index) => ({
            title: step.title,
            onClick: e => {
               e.preventDefault()
               this.setState({
                  currentStep: index
               })
            }
         })),
         currentStep: 0,
         nextBtnName: props.steps.length === 0 ? 'Done' : 'Next'
      }
   }

   onClickPrev = () => {
      const newStep = this.state.currentStep <= 1
         ? 0
         : this.state.currentStep - 1
      this.setState({
         currentStep: newStep,
         nextBtnName: this.props.steps.length === 0 ? 'Done' : newStep < this.props.steps.length - 1 ? 'Next' : 'Done'
      });
   }

   onClickNext = () => {
      const newStep = this.state.currentStep + 1
      if (newStep === this.props.steps.length || this.props.steps.length === 0) {
         return this.props.onStepsDone()
      }
      this.setState({
         currentStep: newStep,
         nextBtnName: this.props.steps.length === 0 ? 'Done' : newStep === this.props.steps.length - 1 ? 'Done' : 'Next'
      })
   }

   render() {
      const { steps, currentStep } = this.state
      const btnStyle = {
         'position': 'absolute',
         'margin': 0,
         'padding': '5px'
      }
      const prevStyle = {
         ...btnStyle,
         'bottom': 0,
         'left': 0
      }
      const nextStyle = {
         ...btnStyle,
         'bottom': 0,
         'right': 0
      }

      return (
         <div>
            <Stepper steps={steps} activeStep={currentStep} />
            <div style={{ 'marginBottom': '10%', 'marginTop': '2%' }}>
               {this.props.steps[currentStep].component}
            </div>
            <div style={{ 'position': 'relative' }}>
               <MDBBtn
                  color="primary"
                  onClick={this.onClickPrev}
                  style={prevStyle}
               >
                  Previous
               </MDBBtn>
               <MDBBtn
                  color="primary"
                  onClick={this.onClickNext}
                  style={nextStyle}
               >
                  {this.state.nextBtnName}
               </MDBBtn>
            </div>
         </div>
      );
   }
}