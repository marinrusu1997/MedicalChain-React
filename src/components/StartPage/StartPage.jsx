import React from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBCarouselCaption, ToastContainer } from 'mdbreact'
import '../../css/buttons.css'
import './StartPage.css'
import {
   USER_TYPE_PATIENT,
   USER_TYPE_MEDIC,
   USER_TYPE_RESEARCHER
} from '../../store/App/actions'
import { AppEndpointsConfigSlide } from './AppEndpointsConfigSlide';
import { UsersSlide } from './UsersSlide';

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
            <MDBCarousel interval={300000} activeItem={1} length={4} showControls={true} showIndicators={false} className="z-depth-1">
               <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                     <UsersSlide
                        viewSrc="https://images.pexels.com/photos/905874/pexels-photo-905874.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        userTypeDisplay="Patient"
                        userTypeDispatch={USER_TYPE_PATIENT}
                        onSignIn={this.onSignIn}
                        onSignUp={this.onSignUp}
                     />
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="2">
                     <UsersSlide
                        viewSrc="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                        userTypeDisplay="Medic"
                        userTypeDispatch={USER_TYPE_MEDIC}
                        onSignIn={this.onSignIn}
                        onSignUp={this.onSignUp}
                     />
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="3">
                     <UsersSlide
                        viewSrc="http://www.bavarian-nordic.com/media/182897/bn_research3_300dpi.jpg"
                        userTypeDisplay="Researcher"
                        userTypeDispatch={USER_TYPE_RESEARCHER}
                        onSignIn={this.onSignIn}
                        onSignUp={this.onSignUp}
                     />
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="4">
                     <AppEndpointsConfigSlide />
                  </MDBCarouselItem>
               </MDBCarouselInner>
            </MDBCarousel>
         </React.Fragment>
      )
   }
}
