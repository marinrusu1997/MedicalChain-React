import React from 'react'
import { MDBMask, MDBView } from "mdbreact"

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
   topWallpaper: "https://wallpapercave.com/wp/6Lib88D.jpg"
 }

export class PatientHome extends React.Component {
   render() {
      return (
         <MDBView src={wallpapers.heartMedicament}>
            <MDBMask overlay="black-strong" className="flex-center flex-column text-white text-center">

            </MDBMask>
         </MDBView>
      )
   }
}