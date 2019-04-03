import React from "react"
import { SpinnerGrowPrimary } from '../Utils/Spinners'
import { connect } from 'react-redux'

class SignUpHeader extends React.Component {
   render() {
      return (
         <p className="h5 text-center mb-4">
            Sign up&nbsp;&nbsp;{this.props.isWaitingForRegisterResp && <SpinnerGrowPrimary />}
         </p>
      )
   }
}

const mapStateToProps = state => {
   return {
      isWaitingForRegisterResp: state.registration.signUpHeader.isWaitingForRegisterResp
   }
}

export default connect(mapStateToProps, null)(SignUpHeader)

