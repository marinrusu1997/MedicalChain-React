import React from "react"
import { ToastContainer } from 'mdbreact'
import { Navbar } from './Navigation/NavBar'
import { BlockchainConfigModal } from "../Utils/BlockchainConfigModal";

export class PatientMainPage extends React.Component {
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
    console.log(config)
  }

  _onBchainKeepPreviousNode = () => {
    console.log('prev state')
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
