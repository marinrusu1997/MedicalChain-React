import React from "react"
import { MDBCard, MDBCardBody, MDBInput } from "mdbreact"

export class PatientPermissionsForm extends React.Component {

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
                        name='patient'
                        onChange={this.props.onInputChange}
                        label="Patient account"
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