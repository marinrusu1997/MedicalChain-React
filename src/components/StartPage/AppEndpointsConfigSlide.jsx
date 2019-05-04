import React from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact'

import { succToast } from '../Utils/Toasts'
import { bchainNodeEndpointConfigSelected } from '../../store/Blockchain/actions'
import { setIdentificationServiceAddr, setWalletServiceAddr } from "../../store/Services/actions";
import { AppEndpointsConfigForm } from '../Utils/AppEndpointsConfig/AppEndpointsConfigForm'
import { AppEndpointsConfigLogic } from "../Utils/AppEndpointsConfig/AppEndpointsConfigLogic";

import { eosio_client } from '../../blockchain/eosio-wallet-client'

class _AppEndpointsConfigSlide extends React.Component {

   constructor(props) {
      super(props)
      this.state = AppEndpointsConfigLogic.makeCurrentConfigObj()
      this.appEndpointsConfigLogic = new AppEndpointsConfigLogic(this.state)
   }

   __resetConfig() {
      this.setState(AppEndpointsConfigLogic.makeEmptyConfigObj())
   }

   onConfigChange = () => {
      this.appEndpointsConfigLogic.updateConfig(this.state)
      if (this.appEndpointsConfigLogic.isConfigValid()) {
         if (this.appEndpointsConfigLogic.needToChangedBlockchainEndpoint()) {
            this.props.bchainNodeEndpointConfigSelected(this.appEndpointsConfigLogic.makeBchainConfigObj())
            eosio_client.resync_with_new_bchain_node_config()
            succToast('Blockchain node endpoint changed')
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

   onAppEndpointsConfigInputChange = event => {
      const name = event.target.name
      const value = event.target.value
      this.setState({ [name]: value })
   }

   render() {
      return (
         <MDBView className="full-display" src="https://www.socialibreria.com/wp-content/uploads/2018/01/blockchain.jpg" alt="Blockchain slide">
            <MDBMask overlay="black-strong" className="flex-center flex-column text-white">
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md="4" />
                     <MDBCol md="4">
                        <p className="h5 text-center mb-4">
                           <i>Application Endpoints Configuration</i>
                        </p>
                        <AppEndpointsConfigForm onInputChange={this.onAppEndpointsConfigInputChange} config={this.state} inputClassName="white-text">
                           <center>
                              <button className="btn btn-success-custom" onClick={this.onConfigChange}>Change</button>
                           </center>
                        </AppEndpointsConfigForm>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </MDBMask>
         </MDBView>
      )
   }
}

const mapDispatchToProps = {
   bchainNodeEndpointConfigSelected,
   setIdentificationServiceAddr,
   setWalletServiceAddr
}

export const AppEndpointsConfigSlide = connect(null, mapDispatchToProps)(_AppEndpointsConfigSlide)