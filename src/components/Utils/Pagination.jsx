import React from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBRow, MDBCol } from "mdbreact";
import { Footer } from './Footer'

export class Pagination extends React.Component {

   render() {
      return (
         <React.Fragment>
            {this.props.children}
            <MDBRow>
               <MDBCol md="9" />
               <MDBCol md="3">
                  <MDBPagination circle color="teal">
                     <MDBPageItem disabled>
                        <MDBPageNav className="page-link">
                           <span>First</span>
                        </MDBPageNav>
                     </MDBPageItem>
                     <MDBPageItem disabled>
                        <MDBPageNav className="page-link" aria-label="Previous">
                           <span aria-hidden="true">&laquo;</span>
                           <span className="sr-only">Previous</span>
                        </MDBPageNav>
                     </MDBPageItem>
                     <MDBPageItem active={this.props.active.first}>
                        <MDBPageNav className="page-link" onClick={this.props.onPageSelected(1)}>
                           1
                     </MDBPageNav>
                     </MDBPageItem>
                     <MDBPageItem active={this.props.active.second}>
                        <MDBPageNav className="page-link" onClick={this.props.onPageSelected(2)}>
                           2
                     </MDBPageNav>
                     </MDBPageItem>
                     <MDBPageItem active={this.props.active.third}>
                        <MDBPageNav className="page-link" onClick={this.props.onPageSelected(3)}>
                           3
                     </MDBPageNav>
                     </MDBPageItem>
                     <MDBPageItem>
                        <MDBPageNav className="page-link">
                           &raquo;
                     </MDBPageNav>
                     </MDBPageItem>
                     <MDBPageItem>
                        <MDBPageNav className="page-link">
                           Last
                     </MDBPageNav>
                     </MDBPageItem>
                  </MDBPagination>
               </MDBCol>
            </MDBRow>
            <Footer />
         </React.Fragment>
      )
   }
}