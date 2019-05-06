import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardHeader, MDBContainer, MDBListGroup, MDBListGroupItem, MDBIcon } from "mdbreact";

export const BchainStateCard = props => {
   return (
      <MDBContainer>
         <MDBCard>
            <MDBCardHeader color="deep-orange lighten-1">
               <img
                  src="https://raw.githubusercontent.com/EOSIO/eos/master/images/eos-logo.png"
                  width="25" height="25" alt="EOS Logo" style={{ 'display': 'inline-block' }}
               />
               Blockchain State
            </MDBCardHeader>
            <MDBCardBody>
               <MDBListGroup>
                  <p><MDBIcon icon="microchip" /> Block CPU Limit: {props.state.block_cpu_limit} microseconds</p>

                  <p><MDBIcon icon="download" /> Block Net Limit: {props.state.block_net_limit} words</p>

                  <p><MDBIcon icon="fingerprint" /> Chain Id: {props.state.chain_id}</p>

                  <p><MDBIcon icon="fingerprint" /> Head Block Id: {props.state.head_block_id}</p>

                  <p><MDBIcon icon="link" /> Head Block Num: {props.state.head_block_num}</p>

                  <p><MDBIcon icon="user-circle" /> Head Block Producer: {props.state.head_block_producer}</p>

                  <p><MDBIcon icon="clock" /> Head Block Time: {props.state.head_block_time}</p>

                  <p><MDBIcon icon="fingerprint" /> Last Irreversible Block Id: {props.state.last_irreversible_block_id}</p>

                  <p><MDBIcon icon="link" /> Last Irreversible Block Num: {props.state.last_irreversible_block_num}</p>

                  <p><MDBIcon icon="server" /> Server Version: {props.state.server_version}</p>

                  <p><MDBIcon icon="server" /> Server Version String: {props.state.server_version_string}</p>

                  <p><MDBIcon icon="microchip" /> Virtual Block CPU Limit: {props.state.virtual_block_cpu_limit}</p>

                  <p><MDBIcon icon="download" /> Virtual Block Net Limit: {props.state.virtual_block_net_limit}</p>

               </MDBListGroup>
            </MDBCardBody>
         </MDBCard>
      </MDBContainer>
   );
};