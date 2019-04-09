import React from 'react'
import { ToastContainer } from 'mdbreact'
import { NavBar } from './Navigation/NavBar'
import { BchainResyncIntercepter } from '../Utils/BchainResyncIntercepter'

export class DoctorMainPage extends React.Component {
   constructor(props) {
      super(props)
      this.bchainResyncInterceptorRef = React.createRef()
      this.state = {
         onResync: null
      }
   }

   componentDidMount() {
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