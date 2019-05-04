import React from "react"
import { MDBBtn } from "mdbreact"
import { PatientPermissionsModal } from "./PatientPermissionsModal";
import { RequestPatientPermsLogic } from "../../../Permission-Commons/RequestPatientPermsLogic";
import { getPatientFullNameFromAccount } from "../../../../servers/identification";

export class PatientPermissionsBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   togleModal = () => this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })

   _resolvePatientNameToDisplay = async account => {
      const fullName = await getPatientFullNameFromAccount(account)
      if (!!!fullName) {
         return account
      }
      return fullName.surname + " " + fullName.name
   }

   onRequestPatientPermsHandler = async patient => {
      this.props.onRequestPatientPerms(await RequestPatientPermsLogic.getPermsFromBchain(patient),
         await this._resolvePatientNameToDisplay(patient))
      this.togleModal()
   }

   render() {
      return (
         <React.Fragment>
            <PatientPermissionsModal
               isOpen={this.state.modal.isOpen}
               toggle={this.togleModal}
               onRequestPatientPerms={this.onRequestPatientPermsHandler}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.togleModal}>
               <i className="fas fa-eye mt-0"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}