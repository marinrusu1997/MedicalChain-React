import React from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact'
import { AppEndpointsConfigForm } from './AppEndpointsConfigForm'
import { AppEndpointsConfigLogic } from "./AppEndpointsConfigLogic"
import { setIdentificationServiceAddr, setWalletServiceAddr } from "../../../store/Services/actions"
import { succToast } from '../Toasts'

class _AppEndpointsConfigModal extends React.Component {
   constructor(props) {
      super(props)
      this.state = AppEndpointsConfigLogic.makeCurrentConfigObj()
      this.appEndpointsConfigLogic = new AppEndpointsConfigLogic(this.state)
   }

   __resetConfig() {
      this.setState(AppEndpointsConfigLogic.makeCurrentConfigObj())
   }

   onAppEndpointsConfigInputChange = event => {
      const name = event.target.name
      const value = event.target.value
      this.setState({ [name]: value })
   }

   onNewAppEndpointsConfig = () => {
      this.appEndpointsConfigLogic.updateConfig(this.state)
      if (this.appEndpointsConfigLogic.isConfigValid()) {
         if (this.appEndpointsConfigLogic.needToChangedBlockchainEndpoint()) {
            this.props.done_hndl(this.appEndpointsConfigLogic.makeBchainConfigObj())
         }
         if (this.appEndpointsConfigLogic.needToChangeIdentificationAddr()) {
            this.props.setIdentificationServiceAddr(this.state.indentification_address)
            succToast('Identification service address changed')
         }
         if (this.appEndpointsConfigLogic.needToChangeWalletAddr()) {
            this.props.setWalletServiceAddr(this.state.wallet_address)
            succToast('Wallet service address changed')
         }
         this.__resetConfig()
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
                  <i><MDBIcon icon="server" /> Application Endpoints Configuration Resync</i>
               </MDBModalHeader>
               <MDBModalBody>
                  <MDBCard>
                     <MDBCardBody>
                        <AppEndpointsConfigForm onInputChange={this.onAppEndpointsConfigInputChange} config={this.state} />
                     </MDBCardBody>
                  </MDBCard>
               </MDBModalBody>
               <MDBModalFooter>
                  <p style={{ 'margin': 'auto', 'padding': '10px' }}>
                     <MDBBtn color="primary" onClick={this.onNewAppEndpointsConfig}>Done</MDBBtn>
                     <MDBBtn className="btn-secondary" onClick={this.props.keep_prev_hndl}>Keep Current</MDBBtn>
                  </p>
               </MDBModalFooter>
            </MDBModal>
         </MDBContainer>
      )
   }
}

const mapDispatchToProps = {
   setIdentificationServiceAddr,
   setWalletServiceAddr
}

export const AppEndpointsConfigModal = connect(null, mapDispatchToProps)(_AppEndpointsConfigModal)