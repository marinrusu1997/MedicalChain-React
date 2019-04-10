import React from 'react'
import { ToastContainer } from 'mdbreact'
import { NavBar } from './Navigation/NavBar'
import { BchainResyncIntercepter } from '../Utils/BchainResyncIntercepter'
import { eosio_client } from '../../blockchain/eosio-wallet-client'
import { errorToast, infoToast } from "../Utils/Toasts";

let wasCalledConnectToWalletBefore = false

export class DoctorMainPage extends React.Component {
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
               acc => infoToast('Reconnected to wallet acc ' + acc),
               err_msg => errorToast(err_msg)
            )
         wasCalledConnectToWalletBefore = true
      }
      this.setState({ onResync: this.bchainResyncInterceptorRef.current.bchainTogleModal })
   }

   render() {
      return (
         <React.Fragment>
            <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
            />
            <BchainResyncIntercepter
               onResync={this.props.onResync}
               ref={this.bchainResyncInterceptorRef}
            />
            <header>
               <NavBar
                  onSignOut={this.props.onSignOut}
                  onResync={this.state.onResync}
               />
            </header>
         </React.Fragment>
      )
   }
}