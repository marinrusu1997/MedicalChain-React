import React from "react"
import { ToastContainer } from 'mdbreact'
import { Navbar } from './Navigation/NavBar'
import { BlockchainEndpointResyncIntercepter } from "../Utils/AppEndpointsConfig/BlockchainEndpointResyncIntercepter";
import { errorToast, infoToast } from "../Utils/Toasts";
import { eosio_client } from "../../blockchain/eosio-wallet-client";

let wasCalledConnectToWalletBefore = false

export class PatientMainPage extends React.Component {

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
      <React.Fragment>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
        <BlockchainEndpointResyncIntercepter
          onResync={this.props.onResync}
          ref={this.bchainResyncInterceptorRef}
        />
        <header>
          <Navbar
            onSignOut={this.props.onSignOut}
            onResync={this.state.onResync}
          />
        </header>
      </React.Fragment>
    );
  }
}
