import React from 'react'
import { connect } from 'react-redux'
import { BlockchainConfigModal } from './BlockchainConfigModal'
import { bchainNodeEndpointConfigSelected } from '../../store/Blockchain/actions'
import { eosio_client } from '../../blockchain/eosio-wallet-client'


class _BchainResyncIntercepter extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         bchainModal: {
            isActive: false
         }
      }
   }

   bchainTogleModal = () => {
      this.setState({ bchainModal: { isActive: !!!this.state.bchainModal.isActive } })
   }

   _onBchainNewNodeEndpointSelected = config => {
      this.bchainTogleModal()
      this.props.bchainNodeEndpointConfigSelected(config)
      eosio_client.resync_with_new_bchain_node_config()
      this.props.onResync()
   }

   _onBchainKeepPreviousNode = () => {
      this.bchainTogleModal()
      this.props.onResync()
   }

   render() {
      return (
         <BlockchainConfigModal
            isOpen={this.state.bchainModal.isActive}
            currentConfig={this.props.currentBchainNodeEndpointConfig}
            toggle={this.bchainTogleModal}
            done_hndl={this._onBchainNewNodeEndpointSelected}
            keep_prev_hndl={this._onBchainKeepPreviousNode}
         />
      )
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

export const BchainResyncIntercepter = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(_BchainResyncIntercepter)