import React from 'react'
import { MDBTooltip, MDBInput } from "mdbreact";

export class PasswordInput extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         inputType: 'password'
      }
   }

   onTogglePasswordClick = () => {
      if (this.state.inputType === 'password') {
         this.setState({ inputType: 'text' })
      } else {
         this.setState({ inputType: 'password' })
      }
   }

   render() {
      const fieldIconCSS = {
         'float': 'right',
         'margin-left': '-10px',
         'margin-top': '-50px',
         'position': 'relative',
         'z-index': '2'
      }
      return (
         <React.Fragment>
            <MDBTooltip
               placement="bottom"
               tooltipContent={this.props.tooltip}>
               <MDBInput
                  id="password-field"
                  value={this.props.password}
                  name='password'
                  onChange={this.props.onChange}
                  required
                  className="white-text"
                  label="Your Password"
                  icon="unlock-alt"
                  type={this.state.inputType}
               />
            </MDBTooltip>
            <span
               toggle="#password-field"
               className="fa fa-fw fa-eye toggle-password"
               style={fieldIconCSS}
               onClick={this.onTogglePasswordClick} />
         </React.Fragment>
      )
   }
}