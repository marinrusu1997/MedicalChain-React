import React from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdbreact'
import Toggle from 'react-bootstrap-toggle'
import { errorToast } from '../Utils/Toasts'

export class BlockchainConfigModal extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         toggleActive: false,
         host: '',
         port: '',
         chain_id: ''
      }
   }

   onInputChange = event => {
      const name = event.target.name
      const value = event.target.value
      this.setState({ [name]: value })
   }

   isHostValid = () => {
      const ip_regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
      if (ip_regex.test(this.state.host)) {
         return (true)
      } else {
         const url_regex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/
         if (url_regex.test(this.state.host)) {
            return true
         }
      }
      errorToast('Invalid Host')
      return (false)
   }

   isPortValid = () => {
      if (this.state.port.length !== 0 && parseInt(this.state.port) !== 0)
         return true
      errorToast('Invalid Port')
      return false
   }

   isChainIdValid = () => {
      if (this.state.chain_id.length === 0 || this.state.chain_id.length === 64)
         return true
      errorToast('Enter a valid chain id or leave it empty')
      return false
   }

   isFormValid = () => {
      return this.isHostValid() && this.isPortValid() && this.isChainIdValid()
   }

   onNewBlockchainNodeConfig = () => {
      if (this.isFormValid()) {
         this.props.done_hndl({
            blockchain: 'eos',
            chainId: this.state.chain_id,
            host: this.state.host,
            port: parseInt(this.state.port),
            protocol: this.state.toggleActive ? 'https' : 'http'
         })
      }
   }

   onToggle = () => {
      this.setState({ toggleActive: !!!this.state.toggleActive })
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
                  <center><strong><font color="#d50000">Make sure you have this blockchain node configuration inside your scatter wallet</font></strong></center>
                  <MDBCard>
                     <MDBCardBody>
                        <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                           <div className="grey-text">
                              <center style={{ margin: '20px 20px' }}>
                                 <Toggle
                                    data-attr-best="Take That"
                                    active={this.state.toggleActive}
                                    onstyle="success"
                                    offstyle="danger"
                                    onClick={this.onToggle}
                                    on={<b>HTTPS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>}
                                    off={<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTTP</b>}
                                 />
                              </center>
                              <MDBInput
                                 name='blockchain'
                                 value='EOS'
                                 label="Blockchain"
                                 iconClass="teal-text"
                                 icon="shield-alt"
                                 type="text"
                                 required
                                 disabled
                              />
                              <MDBInput
                                 name='host'
                                 value={this.state.host}
                                 onChange={this.onInputChange}
                                 label="Host (domain.com or ip)"
                                 iconClass="teal-text"
                                 icon="globe-europe"
                                 type="text"
                                 hint="blockchain.com or 127.0.0.1"
                                 required
                              />
                              <MDBInput
                                 name='port'
                                 value={this.state.port}
                                 onChange={this.onInputChange}
                                 label="Port"
                                 iconClass="teal-text"
                                 icon="desktop"
                                 type="number"
                                 hint='8888'
                                 required
                              />
                              <MDBInput
                                 name='chain_id'
                                 value={this.state.chain_id}
                                 onChange={this.onInputChange}
                                 label="Chain ID (optional)"
                                 iconClass="teal-text"
                                 icon="fingerprint"
                                 type="textarea"
                                 rows="2"
                                 hint='cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
                                 required
                              />
                           </div>
                        </form>
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