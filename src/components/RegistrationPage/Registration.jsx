import React from "react"
import {
   MDBContainer,
   MDBRow,
   MDBCol,
   MDBView,
   MDBMask,
   MDBScrollbar,
   ToastContainer
} from "mdbreact"
import AccountModal from "./AccountModal"
import {
   USER_TYPE_PATIENT,
   USER_TYPE_MEDIC
} from '../../store/App/actions'
import MedicForm from "./Forms/MedicForm"
import PatientForm from "./Forms/PatientForm"
import SignUpHeader from "./SignUpHeader"
import BackToMainButton from './BackToMainButton'
import { InstructionModal } from "./Instruction/InstructionModal";

export class Registration extends React.Component {
   render() {
      return (
         <React.Fragment>
            {/* Toast */}
            <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
            />
            {/* Modal */}
            <AccountModal />
            {/* Authentication */}
            <MDBView src="https://wallpapercave.com/wp/6Lib88D.jpg">
               <MDBMask overlay="black-strong" className="flex-center flex-column text-white ">
                  <BackToMainButton />
                  <MDBContainer>
                     <MDBRow>
                        <MDBCol md="4" />
                        <MDBCol md="4">
                           <InstructionModal />
                           {this.props.userType === USER_TYPE_PATIENT &&
                              <SignUpHeader />
                           }
                           {this.props.userType === USER_TYPE_PATIENT &&
                              <PatientForm />}
                           {this.props.userType === USER_TYPE_MEDIC &&
                              <MedicForm />}
                        </MDBCol>
                     </MDBRow>
                  </MDBContainer>
               </MDBMask>
            </MDBView>
         </React.Fragment>
      )
   }
}