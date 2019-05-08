import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem } from 'mdbreact';
import SideNav from '../../Utils/SideNav'
import SideNavContent from './sideNavigation'
import AccountDropDown from "../../Navigation-Commons/AccountDropDown";

class TopNavigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false
        }
    }

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <MDBNavbar className="text-center gradient-card-header aqua-gradient darken-2 white-text" dark expand="md" scrolling>
                <SideNav>
                    <SideNavContent />
                </SideNav>
                <MDBNavbarBrand>
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

export default TopNavigation;