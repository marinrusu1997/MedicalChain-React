import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { PrivateRoute } from './Utils/PrivateRoute'
import { routes } from '../routes'
import { persistor } from '../store'

import App from './App'
import { PatientHome } from './Patient/PatientHome'
import { PatientPermissions } from './Patient/Permissions/PatientPermissions'

class Routes extends React.Component {
   render() {
      return (
         <Router>
            <Switch>
               <PersistGate loading={<App />} persistor={persistor}>
                  <Route path={routes.app} component={App} />
                  <PrivateRoute path={routes.patient.home} component={PatientHome} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.patient.permissions} component={PatientPermissions} authed={this.props.isUserLoggedIn} />
               </PersistGate>
            </Switch>
         </Router>
      )
   }
}

const mapStateToProps = state => {
   return {
      isUserLoggedIn: state.app.isUserLoggedIn
   }
}

export default connect(mapStateToProps, null)(Routes);