import React, { Component } from "react"

import { TransparencyLogic } from "./TransparencyLogic";

export class TransparencyPatientView extends Component {

   async componentDidMount() {
      console.log(await TransparencyLogic.loadAllActionsByYearAndMonth('rusumarinacc', '2018', '05'))
   }

   render() {
      return (
         <p>asdasd</p>
      )
   }
}