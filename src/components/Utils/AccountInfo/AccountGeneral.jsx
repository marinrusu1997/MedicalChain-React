import React from 'react';
import { MDBCard, MDBCardBody, MDBListGroup, MDBListGroupItem, MDBCardHeader, MDBContainer, MDBIcon } from "mdbreact";

export const AccountGeneral = props => {
   return (
      <MDBContainer>
         <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
            <MDBCardHeader color="primary-color" tag="h3">
               General
            </MDBCardHeader>
            <MDBCardBody>
               <MDBListGroup>
                  <MDBListGroupItem>
                     <MDBIcon far icon="calendar-plus" /> Created: {props.general.created}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="tools" /> Privileged: {props.general.privileged}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <img
                        src="https://raw.githubusercontent.com/EOSIO/eos/master/images/eos-logo.png"
                        width="25" height="25" alt="EOS Logo" style={{ 'display': 'inline-block' }}
                     />
                     Refund Request: {props.general.refund_request}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="download" /> Self Delegated Bandwidth: {props.general.self_delegated_bandwidth}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="person-booth" /> Voter Info: {props.general.voter_info}
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="laptop" /> Total Resources: {props.general.total_resources}
                  </MDBListGroupItem>
               </MDBListGroup>
            </MDBCardBody>
         </MDBCard>
      </MDBContainer>
   );
};