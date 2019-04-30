import React from 'react'
import { MDBTooltip, MDBInput } from "mdbreact";

export class KeyInput extends React.Component {

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
         'marginLeft': '-10px',
         'marginTop': '-50px',
         'position': 'relative',
         'zIndex': '2'
      }
      return (
         <React.Fragment>
            <MDBTooltip
               placement="bottom"
               tooltipContent={this.props.tooltip}>
               <MDBInput
                  id={this.props.id}
                  name={this.props.keyName}
                  onChange={this.props.onChange}
                  required
                  label={this.props.label}
                  icon={this.props.iconType}
                  iconClass={this.props.iconClass}
                  type={this.state.inputType}
               />
            </MDBTooltip>
            <span
               toggle={"#" + this.props.id}
               className="fa fa-fw fa-eye"
               style={fieldIconCSS}
               onClick={this.onTogglePasswordClick} />
         </React.Fragment>
      )
   }
}