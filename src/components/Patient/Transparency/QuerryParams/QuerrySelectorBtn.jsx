import React from 'react'
import { MDBBtn } from "mdbreact";
import { QuerryModal } from './QuerryModal';
import { TransparencyLogic } from "../TransparencyLogic";
import { errorToast } from '../../../Utils/Toasts'

export class QuerrySelectorBtn extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         modal: {
            isOpen: false
         }
      }
   }

   togleModal = () => {
      this.setState({ modal: { isOpen: !!!this.state.modal.isOpen } })
   }

   onQuerryParamsProvidedHandler = async params => {
      try {
         const actions = await TransparencyLogic.loadAllActionsByYearAndMonth(params.doctor, params.year, params.month)
         this.props.onActionsLoaded(params, TransparencyLogic.filterWriteRecordActions(actions),
            TransparencyLogic.filterReadRecordsActions(actions))
      } catch (e) {
         errorToast(e.message)
      }
   }

   render() {
      return (
         <React.Fragment>
            <QuerryModal
               isOpen={this.state.modal.isOpen}
               toggle={this.togleModal}
               onQuerryParamsProvided={this.onQuerryParamsProvidedHandler}
            />
            <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.togleModal}>
               <i className="fa fa-user-md"></i>
            </MDBBtn>
         </React.Fragment>
      )
   }
}