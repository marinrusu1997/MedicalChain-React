import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { PrivateRoute } from './Utils/PrivateRoute'
import { routes } from '../routes'
import { persistor } from '../store'

import App from './App'
import { EOSMedical } from './EOSMedical/EOSMedical'
import { PatientHome } from './Patient/Home/PatientHome'
import { PatientPermissions } from './Patient/Permissions/PatientPermissions'
import { DoctorHome } from './Doctor/DoctorHome'
import { DoctorPermissions } from './Doctor/Permissions/DoctorPermissions'
import { RecordsDoctorView } from './Doctor/Records/RecordsDoctorView';
import { RecordsPatientView } from './Patient/Records/RecordsPatientView';
import { TransparencyPatientView } from './Patient/Transparency/TransparencyPatientView';
import DashboardPage from './Admin/components/pages/DashboardPage';
import ProfilePage from './Admin/components/pages/ProfilePage';
import TablesPage from './Admin/components/pages/TablesPage';
import MapsPage from './Admin/components/pages/MapsPage';

class Routes extends React.Component {
   render() {
      return (
         <Router>
            <Switch>
               <PersistGate loading={<App />} persistor={persistor}>
                  <Route path={routes.app} component={App} />
                  {/*EOS Medical*/}
                  <PrivateRoute path={routes.eosmedical} component={EOSMedical} authed={this.props.isUserLoggedIn} />
                  {/*Patient*/}
                  <PrivateRoute path={routes.patient.home} component={PatientHome} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.patient.permissions} component={PatientPermissions} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.patient.records} component={RecordsPatientView} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.patient.transparency} component={TransparencyPatientView} authed={this.props.isUserLoggedIn} />
                  {/*Doctor*/}
                  <PrivateRoute path={routes.doctor.home} component={DoctorHome} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.doctor.permissions} component={DoctorPermissions} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.doctor.records} component={RecordsDoctorView} authed={this.props.isUserLoggedIn} />
                  {/*Admin*/}
                  <PrivateRoute path={routes.admin.home} component={DashboardPage} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.admin.dashboard} component={DashboardPage} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.admin.profile} component={ProfilePage} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.admin.tables} component={TablesPage} authed={this.props.isUserLoggedIn} />
                  <PrivateRoute path={routes.admin.maps} component={MapsPage} authed={this.props.isUserLoggedIn} />
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