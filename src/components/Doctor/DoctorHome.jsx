import React from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { Footer } from "../Utils/Footer";
import { AccountResources } from '../Utils/AccountInfo/AccountResources';
import { AccountPermissions } from '../Utils/AccountInfo/AccountPermissions';
import { AccountGeneral } from '../Utils/AccountInfo/AccountGeneral';

import { AccountSlide } from "../Utils/AccountInfo/AccountSlide"
import { AccountBChainInfoLogic } from "../Utils/AccountInfo/AccountBchainInfoLogic"

const wallpapers = {
   security: "https://www.crypto-news.net/wp-content/uploads/2018/06/bigstock-Technology-Security-207471322.jpg",
   blockchain: "https://s3.amazonaws.com/cbi-research-portal-uploads/2018/11/28161216/blockchain-feature.jpg"
}


export class DoctorHome extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         accountInfo: AccountBChainInfoLogic._getErrAccountParts()
      }
   }

   async componentDidMount() {
      this.setState({ accountInfo: await AccountBChainInfoLogic.getAccountParts() })
   }

   render() {
      return (
         <React.Fragment>
            <MDBCarousel interval={300000} activeItem={1} length={2} showControls={true} showIndicators={false} className="z-depth-1">
               <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                     <AccountSlide viewSrc={wallpapers.blockchain} >
                        <MDBContainer>
                           <MDBRow>
                              <MDBCol md="3"><AccountGeneral general={this.state.accountInfo.general} /></MDBCol>
                              <MDBCol md="3"></MDBCol>
                              <MDBCol md="3"><AccountResources resources={this.state.accountInfo.resources} /></MDBCol>
                           </MDBRow>
                        </MDBContainer>
                     </AccountSlide>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="2">
                     <AccountSlide viewSrc={wallpapers.security} maskClassName="flex-center flex-column text-center">
                        <AccountPermissions permissions={this.state.accountInfo.permissions} />
                     </AccountSlide>
                  </MDBCarouselItem>
               </MDBCarouselInner>
            </MDBCarousel>
            <Footer />
         </React.Fragment>
      )
   }
}