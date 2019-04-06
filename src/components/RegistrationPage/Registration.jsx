import React from "react"
import {
   MDBContainer,
   MDBRow,
   MDBCol,
   MDBView,
   MDBMask,
   ToastContainer
} from "mdbreact"
import AccountModal from "./AccountModal"
import {
   USER_TYPE_PATIENT,
   USER_TYPE_MEDIC,
   USER_TYPE_RESEARCHER
} from '../../store/App/actions'
import MedicForm from "./Forms/MedicForm"
import { ResearcherForm } from "./Forms/ResearcherForm"
import PatientForm from "./Forms/PatientForm"
import SignUpHeader from "./SignUpHeader"
import BackToMainButton from './BackToMainButton'

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
                           <SignUpHeader />
                           {this.props.userType === USER_TYPE_PATIENT &&
                              <PatientForm />}
                           {this.props.userType === USER_TYPE_MEDIC &&
                              <MedicForm onSubmit={values => console.log(values)} />}
                           {this.props.userType === USER_TYPE_RESEARCHER &&
                              <ResearcherForm />}
                        </MDBCol>
                     </MDBRow>
                  </MDBContainer>
               </MDBMask>
            </MDBView>
         </React.Fragment>
      )
   }
}