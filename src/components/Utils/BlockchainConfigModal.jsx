import React from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCard, MDBCardBody, MDBInput } from 'mdbreact'
import { BchainConfigForm } from '../Utils/BchainConfigForm'
import { isChainIdValid, isHostValid, isPortValid } from '../Utils/BchainConfigValidator'
import { errorToast } from '../Utils/Toasts'

export class BlockchainConfigModal extends React.Component {
   constructor(props) {
      super(props)
      this.state = props.currentConfig
   }

   __resetConfig() {
      this.setState({
         blockchain: 'eos',
         chainId: '',
         host: '',
         port: '',
         protocol: 'http'
      })
   }

   __makeConfigObj = () => ({ ...this.state, port: parseInt(this.state.port) })

   _isConfigValid = () => {
      if (!!!isHostValid(this.state.host)) {
         errorToast('Host is not valid')
         return false
      }
      if (!!!isPortValid(this.state.port)) {
         errorToast('Port is not valid')
         return false
      }
      if (!!!isChainIdValid(this.state.chainId)) {
         errorToast('Enter a valid chain id or leave it empty')
         return false
      }
      return true
   }

   onBchainConfigInputChange = event => {
      const name = event.target.name
      const value = event.target.value
      this.setState({ [name]: value })
   }

   onNewBlockchainNodeConfig = () => {
      if (this._isConfigValid()) {
         this.props.done_hndl(this.__makeConfigObj())
      }
   }

   render() {
      return (
         <MDBContainer>
            <MDBModal isOpen={this.props.isOpen} toggle={() => { }} cascading>
               <MDBModalHeader
                  toggle={this.props.toggle}
                  titleClass="d-inline title"
                  className="text-center gradient-card-header purple-gradient darken-2 white-text">
                  Blockchain Node Endpoint
               </MDBModalHeader>
               <MDBModalBody>
                  <MDBCard>
                     <MDBCardBody>
                        <center><h4><b><font color="red"><p>Make sure you have this new config inside your scatter wallet</p></font></b></h4></center>
                        <BchainConfigForm onInputChange={this.onBchainConfigInputChange} config={this.state} />
                     </MDBCardBody>
                  </MDBCard>
               </MDBModalBody>
               <MDBModalFooter>
                  <p style={{ 'margin': 'auto', 'padding': '10px' }}>
                     <MDBBtn color="primary" onClick={this.onNewBlockchainNodeConfig}>Done</MDBBtn>
                     <MDBBtn className="btn-secondary" onClick={this.props.keep_prev_hndl}>Keep Current</MDBBtn>
                  </p>
               </MDBModalFooter>
            </MDBModal>
         </MDBContainer>
      )
   }
}