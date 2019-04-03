import React from 'react'
import { MDBView, MDBMask, MDBCarouselCaption } from 'mdbreact'

export class UsersSlide extends React.Component {
   render() {
      return (
         <React.Fragment>
            <MDBView className="full-display" src={this.props.viewSrc}>
               <MDBMask overlay="black-strong" />
            </MDBView>
            <MDBCarouselCaption>
               <h3 className="h3-responsive">{this.props.userTypeDisplay}</h3>
               <button className="btn btn-success-custom" value={this.props.userTypeDispatch} onClick={this.props.onSignIn}>Sign In</button>
               <button className="btn btn-primary-custom" value={this.props.userTypeDispatch} onClick={this.props.onSignUp}>Sign Up</button>
            </MDBCarouselCaption>
         </React.Fragment>
      )
   }
}