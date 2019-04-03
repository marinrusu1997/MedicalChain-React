import React from 'react'
import { connect } from 'react-redux'
import { MDBContainer, MDBRow, MDBCol, MDBView, MDBMask } from 'mdbreact'

import { isChainIdValid, isHostValid, isPortValid } from '../Utils/BchainConfigValidator'
import { errorToast, succToast } from '../Utils/Toasts'
import { bchainNodeEndpointConfigSelected } from '../../store/Blockchain/actions'
import { BchainConfigForm } from '../Utils/BchainConfigForm'

import { eosio_client } from '../../blockchain/eosio-wallet-client'


class BchainConfigSlide extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         blockchain: 'eos',
         chainId: '',
         host: '',
         port: '',
         protocol: 'http'
      }
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

   onConfigChange = () => {
      if (this._isConfigValid()) {
         this.props.bchainNodeEndpointConfigSelected(this.__makeConfigObj())
         eosio_client.resync_with_new_bchain_node_config()
         this.__resetConfig()
         succToast('Blockchain node endpoint changed')
      }
   }

   onBchainConfigInputChange = event => {
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
                           Blockchain Node Endpoint Configuration
                        </p>
                        <BchainConfigForm onInputChange={this.onBchainConfigInputChange} config={this.state} inputClassName="white-text">
                           <center>
                              <button className="btn btn-success-custom" onClick={this.onConfigChange}>Change</button>
                           </center>
                        </BchainConfigForm>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </MDBMask>
         </MDBView>
      )
   }
}

const mapDispatchToProps = {
   bchainNodeEndpointConfigSelected
}

export default connect(null, mapDispatchToProps)(BchainConfigSlide)