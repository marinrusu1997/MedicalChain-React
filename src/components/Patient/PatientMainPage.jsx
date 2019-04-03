import React from "react"
import { connect } from 'react-redux'
import { ToastContainer } from 'mdbreact'
import { Navbar } from './Navigation/NavBar'
import { BlockchainConfigModal } from "../Utils/BlockchainConfigModal"
import { bchainNodeEndpointConfigSelected } from '../../store/Blockchain/actions'
import { eosio_client } from '../../blockchain/eosio-wallet-client'

class PatientMainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bchainModal: {
        isActive: false
      }
    }
  }

  _bchainTogleModal = () => {
    this.setState({ bchainModal: { isActive: !!!this.state.bchainModal.isActive } })
  }

  _onBchainNewNodeEndpointSelected = config => {
    this._bchainTogleModal()
    this.props.bchainNodeEndpointConfigSelected(config)
    eosio_client.resync_with_new_bchain_node_config()
    this.props.onResync()
  }

  _onBchainKeepPreviousNode = () => {
    this._bchainTogleModal()
    this.props.onResync()
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
        <BlockchainConfigModal
          isOpen={this.state.bchainModal.isActive}
          currentConfig={this.props.currentBchainNodeEndpointConfig}
          toggle={this._bchainTogleModal}
          done_hndl={this._onBchainNewNodeEndpointSelected}
          keep_prev_hndl={this._onBchainKeepPreviousNode}
        />
        <header>
          <Navbar onSignOut={this.props.onSignOut} onResync={this._bchainTogleModal} />
        </header>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentBchainNodeEndpointConfig: state.blockchain.config,
  }
}

const mapDispatchToProps = {
  bchainNodeEndpointConfigSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(PatientMainPage)
