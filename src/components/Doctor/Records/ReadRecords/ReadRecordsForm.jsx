import React from "react"
import { MDBCard, MDBCardBody, MDBInput } from "mdbreact"
import { NomenclatoryDropdown } from "../../../Utils/NomenclatoryDropdown"
import { IntervalInput } from "../../../Permission-Commons/IntervalInput";

export class ReadRecordsForm extends React.Component {

   constructor(props) {
      super(props)
      this.specialities = []
    /*  props.permNomenclatories.specialitiesNomenclatory.forEach((id, specialty) => {
         this.specialities.push(specialty)
      }) */
   }

   onSpecialitiesNomenclatorySelection = specialities => console.log(specialities)

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
                     <NomenclatoryDropdown
                        id="add-record-specialties"
                        options={this.specialities}
                        multiple={true}
                        placeholder="Choose specialities..."
                        icon={{ className: "teal-text", type: "hospital-symbol" }}
                        onSelection={this.onSpecialitiesNomenclatorySelection}
                     />
                     <IntervalInput onInputChange={this.props.onInputChange} unmodifiable />
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}