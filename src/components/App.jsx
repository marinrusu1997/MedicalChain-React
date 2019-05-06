import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { PatientMainPage } from './Patient/PatientMainPage'
import { DoctorMainPage } from './Doctor/DoctorMainPage'
import { Registration } from './RegistrationPage/Registration'
import { StartPage } from './StartPage/StartPage'
import {
  selectCurrentUserType,
  USER_TYPE_DEFAULT,
  USER_TYPE_PATIENT,
  USER_TYPE_MEDIC,
  USER_TYPE_ADMIN
} from '../store/App/actions'
import {
  userLoggedIn,
  userLoggedOut
} from '../store/App/actions'

import { eosio_client } from '../blockchain/eosio-wallet-client'
import { errorToast, succToast } from './Utils/Toasts'
import { routes } from "../routes";

class App extends React.Component {

  onSignInHandler = userType => {
    eosio_client.connect(
      userName => {
        this.props.userLoggedIn({ userName: userName, userType: userType })
        this.props.history.push(routes.eosmedical)
      },
      msg => errorToast(msg)
    )
  }

  onSignUpHandler = userType => {
    this.props.selectCurrentUserType(userType)
  }

  onSignOutHandler = () => {
    eosio_client.disconnect()
    this.props.userLoggedOut()
  }

  onResyncHandler = () => {
    eosio_client.disconnect()
    eosio_client.connect(userName => succToast('Resync successfull for ' + userName), msg => errorToast(msg))
    if (!!!this.props.rightsNomenclatory)
      eosio_client.load_rigths_to_nomenclator(() => succToast('Rights nomenclator loaded'), err_msg => errorToast(err_msg))
    if (!!!this.props.specialitiesNomenclatory)
      eosio_client.load_specialities_to_nomenclator(() => succToast('Specialities nomenclator loaded'), err_msg => errorToast(err_msg))
  }

  render() {
    if (this.props.isUserLoggedIn === false) {
      if (this.props.currentUserType === USER_TYPE_DEFAULT)
        return <StartPage onSignIn={this.onSignInHandler} onSignUp={this.onSignUpHandler} />
      else
        return <Registration userType={this.props.currentUserType} />
    } else {
      switch (this.props.currentUserType) {
        case USER_TYPE_PATIENT:
          return <PatientMainPage onSignOut={this.onSignOutHandler} onResync={this.onResyncHandler} />
        case USER_TYPE_MEDIC:
          return <DoctorMainPage onSignOut={this.onSignOutHandler} onResync={this.onResyncHandler} />
        case USER_TYPE_ADMIN:
          return <PatientMainPage onSignOut={this.onSignOutHandler} onResync={this.onResyncHandler} />
        default:
          return <p> Something went wrong </p>
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    currentUserType: state.app.currentUserType,
    isUserLoggedIn: state.app.isUserLoggedIn,
    rightsNomenclatory: state.blockchain.rights,
    specialitiesNomenclatory: state.blockchain.specialities
  }
}

const mapDispatchToProps = {
  userLoggedIn,
  userLoggedOut,
  selectCurrentUserType
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
