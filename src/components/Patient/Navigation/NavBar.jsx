import React, { Component } from "react"
import {
   MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from 'mdbreact'
import AccountDropDown from "../../Navigation-Commons/AccountDropDown"
import { routes } from '../../../routes'
import { StoreKeysModal } from "../../Navigation-Commons/StoreKeys/StoreKeysModal";

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
         },
         keysModal: {
            isOpen: false
         }
      }
   }

   toggleCollapse = () => {
      this.setState({ isOpen: !this.state.isOpen });
   }

   toggleKeysModal = () => {
      this.setState({ keysModal: { isOpen: !this.state.keysModal.isOpen } })
   }

   setHomeActive = () => this.setState({ activeLinks: { home: true, permissions: false, records: false, transparency: false } })
   setPermissionsActive = () => this.setState({ activeLinks: { home: false, permissions: true, records: false, transparency: false } })
   setRecordsActive = () => this.setState({ activeLinks: { home: false, permissions: false, records: true, transparency: false } })
   setTransparencyActive = () => this.setState({ activeLinks: { home: false, permissions: false, records: false, transparency: true } })
   resetActiveLinks = () => this.setState({ activeLinks: { home: false, permissions: false, records: false, transparency: false } })

   render() {
      return (
         <>
         <StoreKeysModal isOpen={this.state.keysModal.isOpen} toggle={this.toggleKeysModal}/>
            <MDBNavbar className="text-center gradient-card-header aqua-gradient darken-2 white-text" dark expand="md" scrolling>
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
                     <MDBNavItem active={this.state.activeLinks.records} onClick={this.setRecordsActive}>
                        <MDBNavLink to={routes.patient.records}>ʀᴇᴄᴏʀᴅs</MDBNavLink>
                     </MDBNavItem>
                     <MDBNavItem active={this.state.activeLinks.transparency} onClick={this.setTransparencyActive}>
                        <MDBNavLink to={routes.patient.transparency}>ᴛʀᴀɴsᴘᴀʀᴇɴᴄʏ</MDBNavLink>
                     </MDBNavItem>
                  </MDBNavbarNav>
                  <MDBNavbarNav right>
                     <MDBNavItem>
                        <AccountDropDown onSignOut={this.props.onSignOut} onResync={this.props.onResync} onStoreKeys={this.toggleKeysModal}/>
                     </MDBNavItem>
                  </MDBNavbarNav>
               </MDBCollapse>
            </MDBNavbar>
         </>
      );
   }
}