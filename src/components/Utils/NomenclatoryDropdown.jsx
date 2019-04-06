import React from 'react'
import { MDBIcon } from 'mdbreact'
import { Typeahead } from 'react-bootstrap-typeahead'

export class NomenclatoryDropdown extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Typeahead
               id="rigt-dropdown"
               flip={true}
               highlightOnlyResult={true}
               selectHintOnEnter={true}
               options={this.props.options}
               placeholder="Choose a right..."
               onChange={this.props.onSelection}
               style={{ 'width': '90%', 'float': 'right' }}
               selected={this.props.selections ? this.props.selections : []}
            />
            <p style={{ 'width': '10%' }}><MDBIcon className={this.props.icon.className} icon={this.props.icon.type} size="2x" /></p>
         </React.Fragment>
      )
   }
}