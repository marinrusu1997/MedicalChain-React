import React from 'react'
import { connect } from 'react-redux'
import { AppEndpointsConfigModal } from './AppEndpointsConfigModal'
import { bchainNodeEndpointConfigSelected } from '../../../store/Blockchain/actions'
import { eosio_client } from '../../../blockchain/eosio-wallet-client'

class _BlockchainEndpointResyncIntercepter extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isActive: false
         }
      }
   }

   togleModal = () => {
      this.setState({ modal: { isActive: !!!this.state.modal.isActive } })
   }

   _onBchainNewNodeEndpointSelected = bchain_node_config => {
      this.togleModal()
      this.props.bchainNodeEndpointConfigSelected(bchain_node_config)
      eosio_client.resync_with_new_bchain_node_config()
      this.props.onResync()
   }

   _onBchainKeepPreviousNode = () => {
      this.togleModal()
      this.props.onResync()
   }

   render() {
      return (
         <AppEndpointsConfigModal
            isOpen={this.state.modal.isActive}
            toggle={this.togleModal}
            done_hndl={this._onBchainNewNodeEndpointSelected}
            keep_prev_hndl={this._onBchainKeepPreviousNode}
         />
      )
   }
}

const mapDispatchToProps = {
   bchainNodeEndpointConfigSelected
}

export const BlockchainEndpointResyncIntercepter = connect(null, mapDispatchToProps, null, { forwardRef: true })(_BlockchainEndpointResyncIntercepter)