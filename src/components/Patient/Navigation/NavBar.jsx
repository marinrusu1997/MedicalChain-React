import React, { Component } from "react"
import {
   MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
   MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem,
} from 'mdbreact'
import SideNav from './SideNav'
import AccountDropDown from "./AccountDropDown"
import { routes } from '../../../routes'

export class Navbar extends Component {
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
            <SideNav />
            <MDBNavbarBrand href={routes.app} onClick={this.resetActiveLinks}>
               <strong className="white-text">Medical Chain</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
               <MDBNavbarNav left>
                  <MDBNavItem active={this.state.activeLinks.home} onClick={this.setHomeActive}>
                     <MDBNavLink to={routes.patient.home}>Home</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.state.activeLinks.permissions} onClick={this.setPermissionsActive}>
                     <MDBNavLink to={routes.patient.permissions}>Permissions</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                     <MDBNavLink to="#!">Pricing</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.state.activeLinks.permissions}>
                     <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                           <div className="d-none d-md-inline">Permissions</div>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>
                           <MDBDropdownItem>List</MDBDropdownItem>
                           <MDBDropdownItem>Add</MDBDropdownItem>
                        </MDBDropdownMenu>
                     </MDBDropdown>
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