import React from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBCarouselCaption, ToastContainer } from 'mdbreact'
import '../../css/buttons.css'
import './StartPage.css'
import {
   USER_TYPE_PATIENT,
   USER_TYPE_MEDIC,
   USER_TYPE_RESEARCHER
} from '../../store/App/actions'

export class StartPage extends React.Component {

   onSignIn = event => {
      this.props.onSignIn(event.target.value)
   }

   onSignUp = event => {
      this.props.onSignUp(event.target.value)
   }

   render() {
      return (
         <React.Fragment>
            <ToastContainer
               hideProgressBar={true}
               newestOnTop={true}
               autoClose={5000}
            />
            <MDBCarousel activeItem={1} length={3} showControls={true} showIndicators={false} className="z-depth-1">
               <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                     <MDBView>
                        <img className="full-display"
                           src="https://images.pexels.com/photos/905874/pexels-photo-905874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                           alt="Patient slide" />
                        <MDBMask overlay="black-strong" />
                     </MDBView>
                     <MDBCarouselCaption>
                        <h3 className="h3-responsive">Patient</h3>
                        <button className="btn btn-success-custom" value={USER_TYPE_PATIENT} onClick={this.onSignIn}>Sign In</button>
                        <button className="btn btn-primary-custom" value={USER_TYPE_PATIENT} onClick={this.onSignUp}>Sign Up</button>
                     </MDBCarouselCaption>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="2">
                     <MDBView>
                        <img className="full-display"
                           src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                           alt="Medic slide" />
                        <MDBMask overlay="black-strong" />
                     </MDBView>
                     <MDBCarouselCaption>
                        <h3 className="h3-responsive">Medic</h3>
                        <button className="btn btn-success-custom" value={USER_TYPE_MEDIC} onClick={this.onSignIn}>Sign In</button>
                        <button className="btn btn-primary-custom" value={USER_TYPE_MEDIC} onClick={this.onSignUp}>Sign Up</button>
                     </MDBCarouselCaption>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="3">
                     <MDBView>
                        <img className="full-display"
                           src="http://www.bavarian-nordic.com/media/182897/bn_research3_300dpi.jpg"
                           alt="Researcher slide" />
                        <MDBMask overlay="black-strong" />
                     </MDBView>
                     <MDBCarouselCaption>
                        <h3 className="h3-responsive">Researcher</h3>
                        <button className="btn btn-success-custom" value={USER_TYPE_RESEARCHER} onClick={this.onSignIn}>Sign In</button>
                        <button className="btn btn-primary-custom" value={USER_TYPE_RESEARCHER} onClick={this.onSignUp}>Sign Up</button>
                     </MDBCarouselCaption>
                  </MDBCarouselItem>
               </MDBCarouselInner>
            </MDBCarousel>
         </React.Fragment>
      );
   }
}