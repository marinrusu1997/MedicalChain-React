import React from 'react'
import { MDBView, MDBMask } from "mdbreact";
import { Footer } from '../Utils/Footer';

import { BchainStateCard } from './BchainStateCard';
import { BchainStateLogic } from './BchainStateLogic'

export class EOSMedical extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         bchainState: BchainStateLogic.getDefaultEmptyState()
      }
      this.intervalId = null
   }

   async _startMonitoringBchain() {
      this.setState({ bchainState: await BchainStateLogic.getBchainState() })
   }

   componentDidMount() {
      this.intervalId = setInterval(this._startMonitoringBchain.bind(this), 3000)
   }

   componentWillUnmount() {
      if (this.intervalId) {
         clearInterval(this.intervalId)
      }
   }

   render() {
      return (
         <React.Fragment>
            <MDBView className="full-display" src="https://wallpapercave.com/wp/6Lib88D.jpg">
               <MDBMask overlay="black-strong" className="flex-center flex-column text-center">
                  <BchainStateCard state={this.state.bchainState} />
               </MDBMask>
            </MDBView>
            <Footer />
         </React.Fragment>
      )
   }
}