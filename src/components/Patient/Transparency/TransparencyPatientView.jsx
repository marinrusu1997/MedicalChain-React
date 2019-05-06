import React, { Component } from "react"

import { TransparencyLogic } from "./TransparencyLogic";

export class TransparencyPatientView extends Component {

   async componentDidMount() {
      const actions = await TransparencyLogic.loadAllActionsByYearAndMonth('docvasileion', '2019', '05')
      console.log(TransparencyLogic.filterWriteRecordActions('rusumarinacc', actions))
      console.log(TransparencyLogic.filterReadRecordsActions('rusumarinacc', actions))
   }

   render() {
      return (
         <p>asdasd</p>
      )
   }
}