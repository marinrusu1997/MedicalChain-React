import React from 'react'
import { MDBIcon } from 'mdbreact'
import { Typeahead } from 'react-bootstrap-typeahead'

import 'react-bootstrap-typeahead/css/Typeahead.css'

export class NomenclatoryDropdown extends React.Component {
   render() {
      return (
         <React.Fragment>
            <Typeahead
               id={this.props.id || 'id'}
               flip={true}
               highlightOnlyResult={true}
               selectHintOnEnter={true}
               multiple={this.props.multiple || false}
               options={this.props.options}
               placeholder={this.props.placeholder || "Choose..."}
               onChange={this.props.onSelection}
               style={{ 'width': '90%', 'float': 'right' }}
               selected={this.props.selections ? this.props.selections : []}
            />
            <p style={{ 'width': '10%' }}><MDBIcon className={this.props.icon.className} icon={this.props.icon.type} size="2x" /></p>
         </React.Fragment>
      )
   }
}