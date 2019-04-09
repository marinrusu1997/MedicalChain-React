import React, { Component } from "react"
import {
   MDBDropdown, MDBDropdownMenu, MDBDropdownItem, MDBDropdownToggle, MDBIcon
} from 'mdbreact'
import { connect } from 'react-redux'

class AccountDropDown extends Component {
   render() {
      return (
         <MDBDropdown>
            <MDBDropdownToggle nav caret>
               <MDBIcon icon="user" />
            </MDBDropdownToggle>
            <MDBDropdownMenu className="dropdown-default" right>
               <MDBDropdownItem ><MDBIcon icon="user-circle" />&nbsp;{this.props.userName}</MDBDropdownItem>
               <MDBDropdownItem divider />
               <MDBDropdownItem onClick={this.props.onResync}>
                  <MDBIcon icon="sync" /> Resync
               </MDBDropdownItem>
               <MDBDropdownItem >
                  <MDBIcon icon="file-contract" /> Authorities
               </MDBDropdownItem>
               <MDBDropdownItem divider />
               <MDBDropdownItem onClick={this.props.onSignOut}>
                  <MDBIcon icon="sign-out-alt" />  Sign Out
               </MDBDropdownItem>
            </MDBDropdownMenu>
         </MDBDropdown>
      )
   }
}

const mapStateToProps = state => {
   return {
      userName: state.app.userName
   }
}

export default connect(mapStateToProps, null)(AccountDropDown)