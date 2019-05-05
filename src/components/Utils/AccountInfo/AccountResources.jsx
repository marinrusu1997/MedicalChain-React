import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardHeader, MDBContainer, MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";

export const AccountResources = props => {
   return (
      <MDBContainer>
         <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
            <MDBCardHeader color="deep-orange lighten-1">Resources</MDBCardHeader>
            <MDBCardBody>
               <MDBCardTitle><MDBIcon icon="microchip" /> CPU</MDBCardTitle>
               <MDBListGroup>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-full" /> Max: {props.resources.cpu.max} microseconds
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-three-quarters" /> Available: {props.resources.cpu.available} microseconds
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-quarter" /> Used: {props.resources.cpu.used} microseconds
                  </MDBListGroupItem>
               </MDBListGroup>

               <MDBCardTitle><MDBIcon icon="upload" /> Net</MDBCardTitle>
               <MDBListGroup>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-full" /> Max: {props.resources.net.max} words
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-three-quarters" /> Available: {props.resources.net.available} words
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-quarter" /> Used: {props.resources.net.used} words
                  </MDBListGroupItem>
               </MDBListGroup>

               <MDBCardTitle><MDBIcon icon="memory" /> RAM</MDBCardTitle>
               <MDBListGroup>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-full" /> Quota: {props.resources.ram.quota} bytes
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="battery-quarter" /> Usage: {props.resources.ram.usage} bytes
                  </MDBListGroupItem>
               </MDBListGroup>
            </MDBCardBody>
         </MDBCard>
      </MDBContainer>
   );
};