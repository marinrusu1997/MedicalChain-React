import React from 'react'
import {
   MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
   MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from 'mdbreact'

import { routes } from '../../../routes'
import AccountDropDown from "../../Navigation-Commons/AccountDropDown"

export class NavBar extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         isOpen: false,
         activeLinks: {
            home: false,
            permissions: false
         }
      }
   }

   toggleCollapse = () => {
      this.setState({ isOpen: !this.state.isOpen });
   }

   setHomeActive = () => this.setState({ activeLinks: { home: true, permissions: false } })
   setPermissionsActive = () => this.setState({ activeLinks: { home: false, permissions: true } })
   resetActiveLinks = () => this.setState({ activeLinks: { home: false, permissions: false } })

   render() {
      return (
         <MDBNavbar className="text-center gradient-card-header aqua-gradient darken-2 white-text" dark expand="md" scrolling>
            <MDBNavbarBrand href={routes.app} onClick={this.resetActiveLinks}>
               <strong className="white-text">Medical Chain</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapseDoctor" isOpen={this.state.isOpen} navbar>
               <MDBNavbarNav left>
                  <MDBNavItem active={this.state.activeLinks.home} onClick={this.setHomeActive}>
                     <MDBNavLink to={routes.doctor.home}>Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.state.activeLinks.permissions} onClick={this.setPermissionsActive}>
                     <MDBNavLink to={routes.doctor.permissions}>Permissions</MDBNavLink>
                  </MDBNavItem>
               </MDBNavbarNav>
               <MDBNavbarNav right>
                  <MDBNavItem>
                     <AccountDropDown onSignOut={this.props.onSignOut} onResync={this.props.onResync} />
                  </MDBNavItem>
               </MDBNavbarNav>
            </MDBCollapse>
         </MDBNavbar>
      );
   }
}