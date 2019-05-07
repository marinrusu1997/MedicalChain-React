import React, { Component } from "react"
import { MDBCard, MDBCardHeader, MDBCardBody } from "mdbreact";
import { Pagination } from "../../Utils/Pagination";
import { QuerrySelectorBtn } from "./QuerryParams/QuerrySelectorBtn";

export class TransparencyPatientView extends Component {

   constructor(props) {
      super(props)
      this.state = {
         activePages: {
            first: true,
            second: false,
            third: false
         }
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

   onActionsLoadedHandler = (writeRecords, readRecords) => {
      console.log(writeRecords, readRecords)
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
                        this.state.activePages.first && <p>First Page</p>
                     }
                     {
                        this.state.activePages.second && <p>Second Page</p>
                     }
                     {
                        this.state.activePages.third && <p>Third Page</p>
                     }
                  </MDBCardBody>
               </MDBCard>
               <p />
            </React.Fragment>
         </Pagination>
      )
   }
}