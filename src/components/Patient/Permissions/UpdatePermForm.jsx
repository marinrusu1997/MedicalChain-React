import React from 'react'
import { MDBCard, MDBCardBody } from 'mdbreact'
import { IntervalInput } from '../../Permission-Commons/IntervalInput'
import { NomenclatoryDropdown } from '../../Utils/NomenclatoryDropdown'

export class UpdatePermForm extends React.Component {

   constructor(props) {
      super(props)
      this.rights = []
      props.permNomenclatories.rightsNomenclatory.forEach((id, right) => {
         this.rights.push(right)
      })
      this.specialities = []
      props.permNomenclatories.specialitiesNomenclatory.forEach((id, specialty) => {
         this.specialities.push(specialty)
      })
      this.state = null
      this.rightSelections = []
      this.specialitiesSelections = []
      if (this.props.permInfo) {
         this.state = {
            interval: this.props.permInfo.interval,
            start: this.props.permInfo.start_time !== "INFINITE" ? this.props.permInfo.start_time : "",
            stop: this.props.permInfo.end_time !== "INFINITE" ? this.props.permInfo.end_time : ""
         }
         this.rightSelections = [this.props.permInfo.right]
         this.specialitiesSelections = this.props.permInfo.specialties
      } else {
         this.state = {
            interval: 'INFINITE',
            start: "",
            stop: ""
         }
      }
   }

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   onTimeIntervalChange = event => {
      if (event.target.name === 'interval' && event.target.value === 'INFINITE') {
         this.setState({
            interval: 'INFINITE',
            start: "",
            stop: ""
         })
      } else {
         this.setState({ [event.target.name]: event.target.value })
      }
      this.props.onInputChange({ target: { name: event.target.name, value: event.target.value } })
   }

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <IntervalInput
                        interval={this.state.interval}
                        start_time={this.state.start}
                        end_time={this.state.stop}
                        onInputChange={this.onTimeIntervalChange}
                     />
                     <NomenclatoryDropdown
                        options={this.rights}
                        icon={{ className: "teal-text", type: "book-reader" }}
                        selections={this.rightSelections}
                        onSelection={rights => this.props.onInputChange({ target: { name: 'right', value: rights[0] } })}
                     />
                     <NomenclatoryDropdown
                        id="add-specialties"
                        options={this.specialities}
                        multiple={true}
                        selections={this.specialitiesSelections}
                        placeholder="Choose specialty..."
                        icon={{ className: "teal-text", type: "hospital-symbol" }}
                        onSelection={specialties => this.props.onInputChange({ target: { name: 'specialties', value: specialties } })}
                     />
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}