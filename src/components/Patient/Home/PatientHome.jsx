import React from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBContainer, MDBRow, MDBCol } from "mdbreact"
import { Footer } from "../../Utils/Footer";
import { AccountResources } from '../../Utils/AccountInfo/AccountResources';
import { AccountPermissions } from '../../Utils/AccountInfo/AccountPermissions';
import { RecordsBySpecialitiesChart } from '../../Utils/AccountInfo/RecordsBySpecialitiesChart';
import { AccountGeneral } from '../../Utils/AccountInfo/AccountGeneral';
import { errorToast } from "../../Utils/Toasts";

import { AccountSlide } from "./AccountSlide"
import { RecordsBySpecLogic } from './RecordsBySpecLogic';
import { AccountBChainInfoLogic } from "./AccountBchainInfoLogic";

import './PatientHome.css'

const wallpapers = {
   medicalchain2: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Hnd01gaCiu89hpk4/videoblocks-megastructures-in-space-gray-background-depth-of-field-place-for-text-plexus-cinematographic-business-medical-background-visualization-of-abstract-forms-of-the-plexus-connection-and-web-concept_bbm7inicm_thumbnail-full01.png",
   medicalchain: "https://mypromed.ru/wp-content/uploads/2018/01/abstract-bright-blue-dna-molecular-structure-animated-background-motion-graphic-design-medical-video-clip-ultra-hd-4k-3840x2160_r0reu5dwe_thumbnail-full01.png",
   heart: "https://wallpaperplay.com/walls/full/3/c/6/13969.jpg",
   adn: "https://wallpaperfm.com/img/original/4/9/8/41644.jpg",
   adnDark: "http://www.mitre.org/sites/default/files/images/bio-weapon-dna.jpg",
   adnBlue: "https://wallpaperplay.com/walls/full/d/1/3/13992.jpg",
   stetoskope: "https://wallpaperplay.com/walls/full/0/4/3/13967.jpg",
   stetoskope2: "https://wallpaperplay.com/walls/full/6/8/e/13981.jpg",
   forMedic: "https://www.wallpaperup.com/uploads/wallpapers/2013/03/05/48388/9f00a8e4bdc4009ca1b1facab7604399.jpg",
   forMedic2: "https://wallpaperplay.com/walls/full/6/e/1/13983.jpg",
   forPatient: "https://wallpaperplay.com/walls/full/e/7/f/13977.jpg",
   heartMedicament: "https://wallpaperplay.com/walls/full/e/1/f/14021.jpg",
   topWallpaper: "https://wallpapercave.com/wp/6Lib88D.jpg",
   security: "https://www.crypto-news.net/wp-content/uploads/2018/06/bigstock-Technology-Security-207471322.jpg",
   blockchain: "https://s3.amazonaws.com/cbi-research-portal-uploads/2018/11/28161216/blockchain-feature.jpg"
}

export class PatientHome extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         recordsChart: {
            labels: [],
            data: []
         },
         accountInfo: AccountBChainInfoLogic._getErrAccountParts()
      }
   }

   async componentDidMount() {
      this.setState({ accountInfo: await AccountBChainInfoLogic.getAccountParts() })
      this.setState({ recordsChart: await RecordsBySpecLogic.getRecordsBySpecialities() })
   }

   render() {
      return (
         <React.Fragment>
            <MDBCarousel interval={300000} activeItem={1} length={3} showControls={true} showIndicators={false} className="z-depth-1">
               <MDBCarouselInner>
                  <MDBCarouselItem itemId="1">
                     <AccountSlide viewSrc={wallpapers.stetoskope2} maskClassName="flex-center flex-column text-white text-center">
                        <RecordsBySpecialitiesChart labels={this.state.recordsChart.labels} data={this.state.recordsChart.data} />
                     </AccountSlide>
                  </MDBCarouselItem>
                  <MDBCarouselItem itemId="2">
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
                  <MDBCarouselItem itemId="3">
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