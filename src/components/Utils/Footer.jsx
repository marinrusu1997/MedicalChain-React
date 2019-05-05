import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

export const Footer = () => {
   return (
      <MDBFooter color="blue" className="font-small">
         <div className="footer-copyright text-center py-3">
            <MDBContainer fluid>
               &copy; {new Date().getFullYear()} Powered by <a target="_blank" rel="noopener noreferrer" href="https://eos.io/"> EOSIO Blockchain </a>
            </MDBContainer>
         </div>
      </MDBFooter>
   );
}