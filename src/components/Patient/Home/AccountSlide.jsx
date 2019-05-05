import React from 'react'
import { MDBView, MDBMask, MDBCarouselCaption } from 'mdbreact'

export class AccountSlide extends React.Component {
   render() {
      return (
         <React.Fragment>
            <MDBView className="full-display" src={this.props.viewSrc}>
               <MDBMask overlay="black-strong" className={this.props.maskClassName}>
                  {this.props.children}
               </MDBMask>
            </MDBView>
         </React.Fragment>
      )
   }
}