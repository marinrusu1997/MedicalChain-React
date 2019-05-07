import React, { Component } from "react"
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";
import { Pagination } from "../../Utils/Pagination";
import { QuerrySelectorBtn } from "./QuerryParams/QuerrySelectorBtn";
import { LineChart } from "../../Utils/LineChart";
import { WriteActionsTable } from "./WriteTable/WriteTable";
import { ReadActionsTable } from "./ReadTable/ReadTable";

export class TransparencyPatientView extends Component {

   constructor(props) {
      super(props)
      this.state = {
         activePages: {
            first: true,
            second: false,
            third: false
         },
         chart: {
            chartName: 'Transparency Chart',
            labels: [],
            datasets: {
               first: {
                  label: 'Write Actions',
                  data: []
               },
               second: {
                  label: 'Read Actions',
                  data: []
               }
            }
         },
         writeTableRows: [],
         readTableRows: []
      }

   }

   onPageSelectedHandler = pageNumber => () => {
      switch (pageNumber) {
         case 1: {
            this.setState({ activePages: { first: true, second: false, third: false } })
         }
            break;
         case 2: {
            this.setState({ activePages: { first: false, second: true, third: false } })
         }
            break;
         case 3: {
            this.setState({ activePages: { first: false, second: false, third: true } })
         }
            break;
      }
   }

   __getNoOfDaysInMonth = (year, month) => new Date(Number(year), Number(month), 0).getDate()

   _getDataset = (actions, noOfDays) => {
      const no_of_actions = Array.from(Array(noOfDays), () => 0)
      for (const action of actions) {
         no_of_actions[Number(action.block_time.substr(8, 2)) - 1]++
      }
      return no_of_actions
   }

   _getChartParams = (params, writeActions, readActions) => {
      const daysInMonth = this.__getNoOfDaysInMonth(Number(params.year), Number(params.month))
      const days = Array.from(Array(daysInMonth), (_, x) => x + 1)
      const writeDataset = this._getDataset(writeActions, daysInMonth)
      const readDataset = this._getDataset(readActions, daysInMonth)
      return {
         chartName: 'Transparency Chart ' + params.doctor + ' ' + params.month + '-' + params.year,
         labels: days,
         datasets: {
            first: {
               label: 'Write Actions',
               data: writeDataset
            },
            second: {
               label: 'Read Actions',
               data: readDataset
            }
         }
      }
   }

   onActionsLoadedHandler = (params, writeActions, readActions) => {
      this.setState({
         chart: this._getChartParams(params, writeActions, readActions),
         writeTableRows: writeActions,
         readTableRows: readActions
      })
   }

   render() {
      return (
         <Pagination
            active={this.state.activePages}
            onPageSelected={this.onPageSelectedHandler}>
            <React.Fragment>
               <MDBCard narrow>
                  <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                     <div />
                     <a href="#!" className="white-text mx-3"><i>Transparency Monitoring</i></a>
                     <QuerrySelectorBtn onActionsLoaded={this.onActionsLoadedHandler} />
                  </MDBCardHeader>
                  <MDBCardBody cascade>
                     {
                        this.state.activePages.first &&
                        <center>
                           <LineChart
                              chartName={this.state.chart.chartName}
                              labels={this.state.chart.labels}
                              datasets={this.state.chart.datasets}
                           />
                        </center>
                     }
                     {
                        this.state.activePages.second &&
                        <React.Fragment>
                           <center>
                              <font color="black">
                                 Write Actions
                              </font>
                           </center>
                           <WriteActionsTable rows={this.state.writeTableRows} />
                        </React.Fragment>
                     }
                     {
                        this.state.activePages.third &&
                        <React.Fragment>
                           <center>
                              <font color="black">
                                 Read Actions
                              </font>
                           </center>
                           <ReadActionsTable rows={this.state.readTableRows} />
                        </React.Fragment>
                     }
                  </MDBCardBody>
               </MDBCard>
               <p />
            </React.Fragment>
         </Pagination>
      )
   }
}