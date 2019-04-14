import React from 'react'
import { MDBCard, MDBCardBody, MDBInput } from 'mdbreact'

export class PatientAccountFormFullNameForm extends React.Component {

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <MDBInput
                        name='surname'
                        onChange={this.props.onInputChange}
                        label="Patient Surname"
                        iconClass="teal-text"
                        icon="user-tie"
                        type="text"
                        required
                     />
                     <MDBInput
                        name='name'
                        onChange={this.props.onInputChange}
                        label="Patient Name"
                        iconClass="teal-text"
                        icon="user-tie"
                        type="text"
                        required
                     />
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}