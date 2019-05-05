import React from 'react'
import { MDBView, MDBMask } from "mdbreact";
import { Footer } from '../Utils/Footer';

export class EOSMedical extends React.Component {
   render() {
      return (
         <React.Fragment>
            <MDBView className="full-display" src="https://wallpapercave.com/wp/6Lib88D.jpg">
               <MDBMask overlay="black-strong" className="flex-center flex-column text-center">
                  {this.props.children}
               </MDBMask>
            </MDBView>
            <Footer />
         </React.Fragment>
      )
   }
}