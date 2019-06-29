import React, { Component } from 'react';
import TopNavigation from './components/topNavigation';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { BlockchainEndpointResyncIntercepter } from '../Utils/AppEndpointsConfig/BlockchainEndpointResyncIntercepter';
import { eosio_client } from '../../blockchain/eosio-wallet-client';
import { infoToast, errorToast } from '../Utils/Toasts';

let wasCalledConnectToWalletBefore = false

export class AdminMainPage extends Component {

   constructor(props) {
      super(props)
      this.bchainResyncInterceptorRef = React.createRef()
      this.state = {
         onResync: null
      }
   }

   componentDidMount() {
      if (!!!eosio_client.is_connected() && !!!wasCalledConnectToWalletBefore) {
         eosio_client.connect
            (
               account => infoToast(`Successfully reconnected with ${account}`),
               errorToast
            )
         wasCalledConnectToWalletBefore = true
      }
      this.setState({ onResync: this.bchainResyncInterceptorRef.current.togleModal })
   }

   render() {
      return (
         <>
            <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
            />
            <BlockchainEndpointResyncIntercepter
               onResync={this.props.onResync}
               ref={this.bchainResyncInterceptorRef}
            />
            <div className="flexible-content">
               <TopNavigation onSignOut={this.props.onSignOut} onResync={this.state.onResync} />
            </div>
         </>
      );
   }
}