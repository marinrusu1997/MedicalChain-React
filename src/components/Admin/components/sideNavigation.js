import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';
import { routes } from "../../../routes";

const TopNavigation = () => {
    return (
        <React.Fragment>
            <center>
                <img
                    src="https://blocksdecoded.com/wp-content/uploads/2019/02/EOS-logo-2019.jpg"
                    width="100" height="200" alt="EOS Logo" style={{ 'display': 'inline-block' }}
                />
            </center>
            <MDBListGroup className="list-group-flush">
                <NavLink to={routes.admin.dashboard} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3" />
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to={routes.admin.profile} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="user" className="mr-3" />
                        Profiles
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to={routes.admin.tables} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="table" className="mr-3" />
                        Tables
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to={routes.admin.maps} activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="map" className="mr-3" />
                        Maps
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </React.Fragment>
    );
}

export default TopNavigation;