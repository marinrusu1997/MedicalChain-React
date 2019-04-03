import React from 'react'
import { connect } from 'react-redux'
import PatientMainPage from './Patient/PatientMainPage'
import { Registration } from './RegistrationPage/Registration'
import { StartPage } from './StartPage/StartPage'
import {
  selectCurrentUserType,
  USER_TYPE_DEFAULT,
  USER_TYPE_PATIENT,
  USER_TYPE_MEDIC,
  USER_TYPE_RESEARCHER
} from '../store/App/actions'
import {
  userLoggedIn,
  userLoggedOut
} from '../store/App/actions'

import { eosio_client } from '../blockchain/eosio-wallet-client'
import { errorToast, succToast } from './Utils/Toasts'

import cryptico from 'cryptico'
import CryptoJS from 'crypto-js'


function testEncryptionCryptico() {

  // The passphrase used to repeatably generate this RSA key.
  var PassPhrase = "The Moon is a Harsh Mistress.";

  // The length of the RSA key, in bits.
  var Bits = 1024;

  var MattsRSAkey = cryptico.generateRSAKey(PassPhrase, Bits);

  var MattsPublicKeyString = cryptico.publicKeyString(MattsRSAkey);

  let json = MattsRSAkey.toJSON()

  console.log('RSA ', json)
  console.log('Pub ', MattsPublicKeyString)

  MattsRSAkey.setPrivateEx(json.n, json.e, json.d, json.p, json.q, json.dmp1, json.dmq1, json.coeff)

  var PlainText = "Matt, I need you to help me with my Starcraft strategy.";

  var PassPhrase = "There Ain't No Such Thing As A Free Lunch.";

  var SamsRSAkey = cryptico.generateRSAKey(PassPhrase, 1024);

  var EncryptionResult = cryptico.encrypt(PlainText, MattsPublicKeyString, SamsRSAkey);

  console.log('Encrypted ', EncryptionResult)

  var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, MattsRSAkey);

  console.log('Decripted ', DecryptionResult)
}

function md5File() {
  console.log(CryptoJS.SHA256('Hello World!').toString())
}

class App extends React.Component {

  onSignInHandler = userType => {
    eosio_client.connect(
      userName => this.props.userLoggedIn({ userName: userName, userType: userType }),
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
          return <PatientMainPage onSignOut={this.onSignOutHandler} onResync={this.onResyncHandler} />
        case USER_TYPE_RESEARCHER:
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
