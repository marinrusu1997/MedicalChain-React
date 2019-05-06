import React, { Component } from "react"
import {
   MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from 'mdbreact'
import SideNav from './SideNav'
import AccountDropDown from "../../Navigation-Commons/AccountDropDown"
import { routes } from '../../../routes'

export class Navbar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         isOpen: false,
         activeLinks: {
            home: false,
            permissions: false,
            records: false,
            transparency: false
         }
      }
   }

   toggleCollapse = () => {
      this.setState({ isOpen: !this.state.isOpen });
   }

   setHomeActive = () => this.setState({ activeLinks: { home: true, permissions: false, records: false, transparency: false } })
   setPermissionsActive = () => this.setState({ activeLinks: { home: false, permissions: true, records: false, transparency: false } })
   setRecordsActive = () => this.setState({ activeLinks: { home: false, permissions: false, records: true, transparency: false } })
   setTransparencyActive = () => this.setState({ activeLinks: { home: false, permissions: false, records: false, transparency: true } })
   resetActiveLinks = () => this.setState({ activeLinks: { home: false, permissions: false, records: false, transparency: false } })

   render() {
      return (
         <MDBNavbar className="text-center gradient-card-header aqua-gradient darken-2 white-text" dark expand="md" scrolling>
            <SideNav />
            <MDBNavbarBrand href={routes.eosmedical} onClick={this.resetActiveLinks}>
               <strong className="white-text">
                  <img
                     src="https://raw.githubusercontent.com/EOSIO/eos/master/images/eos-logo.png"
                     width="30" height="30" alt="EOS Logo" />
                  𝓔𝓞𝓢 𝓜𝓮𝓭𝓲𝓬𝓪𝓵
               </strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />
            <MDBCollapse id="navbarCollapsePatient" isOpen={this.state.isOpen} navbar>
               <MDBNavbarNav left>
                  <MDBNavItem active={this.state.activeLinks.home} onClick={this.setHomeActive}>
                     <MDBNavLink to={routes.patient.home}>ʜᴏᴍᴇ</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.state.activeLinks.permissions} onClick={this.setPermissionsActive}>
                     <MDBNavLink to={routes.patient.permissions}>ᴘᴇʀᴍɪssɪᴏɴs</MDBNavLink>
                  </MDBNavItem>
                  {/* <MDBNavItem active={this.state.activeLinks.permissions}>
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
                  */ }
                  <MDBNavItem active={this.state.activeLinks.records} onClick={this.setRecordsActive}>
                     <MDBNavLink to={routes.patient.records}>ʀᴇᴄᴏʀᴅs</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={this.state.activeLinks.transparency} onClick={this.setTransparencyActive}>
                     <MDBNavLink to={routes.patient.transparency}>ᴛʀᴀɴsᴘᴀʀᴇɴᴄʏ</MDBNavLink>
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