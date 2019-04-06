import React from 'react'
import { MDBCard, MDBCardBody } from 'mdbreact'
import { IntervalInput } from './IntervalInput'
import { NomenclatoryDropdown } from '../../Utils/NomenclatoryDropdown'

export class UpdatePermForm extends React.Component {

   constructor(props) {
      super(props)
      this.rights = []
      props.permNomenclatories.rightsNomenclatory.forEach((id, right) => {
         this.rights.push(right)
      })
      this.state = null
      this.selections = []
      if (this.props.permInfo) {
         this.state = {
            interval: this.props.permInfo.interval,
            start: this.props.permInfo.start_time !== "INFINITE" ? this.props.permInfo.start_time : "",
            stop: this.props.permInfo.end_time !== "INFINITE" ? this.props.permInfo.end_time : ""
         }
         this.selections = [this.props.permInfo.right]
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
                        selections={this.selections}
                        onSelection={rights => this.props.onInputChange({ target: { name: 'right', value: rights[0] } })}
                     />
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}