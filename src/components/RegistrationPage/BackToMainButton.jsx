import React from "react"
import { connect } from 'react-redux'
import { MDBIcon } from 'mdbreact'
import {
   unselectCurrentUserType,
   USER_TYPE_PATIENT,
   USER_TYPE_MEDIC,
   USER_TYPE_RESEARCHER
} from '../../store/App/actions'
import { resetPatientRegistrationForm } from '../../store/Registration/Forms/Patient/actions'
import { resetDoctorRegistrationForm } from "../../store/Registration/Forms/Doctor/actions";

class BackToMainButton extends React.Component {

   onBackPressed = () => {
      this.props.unselectCurrentUserType()
      switch (this.props.currentUserType) {
         case USER_TYPE_PATIENT: {
            this.props.resetPatientRegistrationForm()
         }
            break;
         case USER_TYPE_MEDIC: {
            this.props.resetDoctorRegistrationForm()
         }
            break;
      }
   }

   render() {
      return (
         <button className="btn btn-transparent btn-nav-tl" onClick={this.onBackPressed}>
            <MDBIcon icon="arrow-left" size="2x" />
         </button>
      )
   }
}

const mapStateToProps = state => {
   return {
      currentUserType: state.app.currentUserType
   }
}

const mapDispatchToProps = {
   unselectCurrentUserType,
   resetPatientRegistrationForm,
   resetDoctorRegistrationForm
}

export default connect(mapStateToProps, mapDispatchToProps)(BackToMainButton)