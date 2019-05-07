import React from 'react'
import { MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import { NomenclatoryDropdown } from "../../../Utils/NomenclatoryDropdown";

export class QuerryForm extends React.Component {

   constructor(props) {
      super(props)
      this.monthsMap = new Map()
      this._fillMonthsMap()
      this.monthsList = Array.from(this.monthsMap.keys())
   }

   _fillMonthsMap = () => {
      this.monthsMap.set('January', '01')
      this.monthsMap.set('February', '02')
      this.monthsMap.set('March', '03')
      this.monthsMap.set('April', '04')
      this.monthsMap.set('May', '05')
      this.monthsMap.set('June', '06')
      this.monthsMap.set('July', '07')
      this.monthsMap.set('August', '08')
      this.monthsMap.set('September', '09')
      this.monthsMap.set('October', '10')
      this.monthsMap.set('November', '11')
      this.monthsMap.set('December', '12')
   }

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   onMonthSelected = months => {
      if (months.length !== 0) {
         this.props.onInputChange({ target: { name: 'month', value: this.monthsMap.get(months[0]) } })
      }
   }

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <MDBInput
                        name='doctor'
                        onChange={this.props.onInputChange}
                        label="Doctor account"
                        iconClass="teal-text"
                        icon="user-tie"
                        type="text"
                        required
                     />
                     <MDBInput
                        name='year'
                        onChange={this.props.onInputChange}
                        label="Year"
                        iconClass="teal-text"
                        icon="calendar"
                        type="numeric"
                        maxLength="4"
                        required
                     />
                     <NomenclatoryDropdown
                        id="month-dropdown"
                        options={this.monthsList}
                        placeholder="Choose month..."
                        onSelection={this.onMonthSelected}
                        icon={{
                           className: "teal-text",
                           type: "calendar-week"
                        }}
                     />
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}