import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardHeader, MDBBtn, MDBContainer, MDBListGroup, MDBListGroupItem, MDBIcon } from
   "mdbreact";

export const AccountPermissions = props => {
   return (
      <React.Fragment>
         <MDBCard className="text-center">
            <MDBCardHeader color="success-color" tag="h3">Permissions</MDBCardHeader>
            <MDBCardBody>
               {
                  props.permissions.map(perm => {
                     return (
                        <MDBContainer key={perm.name} id={perm.name}>
                           <MDBCardTitle>Name: {perm.perm_name}</MDBCardTitle>
                           <MDBListGroup>
                              <MDBListGroupItem>
                                 <p>Parent: {perm.parent} </p>
                                 <p><MDBIcon icon="lock" className="deep-orange-text" /> Required Authority:</p>
                                 <MDBIcon icon="circle" className="deep-orange-text" /> Threshold {perm.required_auth.threshold}
                                 <MDBListGroup>
                                    <p>Keys:</p>
                                    {
                                       perm.required_auth.keys.map(key => {
                                          return (
                                             <MDBListGroupItem key={key.key} id={key.key}>
                                                <p><MDBIcon icon="key" className="deep-orange-text" /> Key: {key.key}</p>
                                                <p><MDBIcon icon="chart-pie" className="deep-orange-text" /> Weight: {key.weight}</p>
                                             </MDBListGroupItem>
                                          )
                                       })
                                    }
                                 </MDBListGroup>
                              </MDBListGroupItem>
                           </MDBListGroup>
                        </MDBContainer>
                     )
                  })
               }
            </MDBCardBody>
         </MDBCard>
      </React.Fragment>
   );
};