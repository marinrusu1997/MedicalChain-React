import React from 'react'
import { MDBCollapse, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact'

export class TransactionReceipt extends React.Component {
   render() {
      return (
         <React.Fragment>
            <center>
               <font color="#006400">Transaction details</font>
               <button onClick={this.props.onCollapse} type="button" className="btn btn-outline-info btn-sm"><MDBIcon icon="angle-down" /></button>
            </center>
            <MDBCollapse isOpen={this.props.isCollapsed}>
               <MDBListGroup>
                  <MDBListGroupItem>
                     <MDBIcon icon="fingerprint" /><font color="#FF3800">&nbsp;Id&nbsp;&nbsp;&nbsp;</font>
                     <font color="black">{this.props.tr_receipt.id}</font>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon far icon="check-circle" /><font color="#FF3800">&nbsp;Status&nbsp;&nbsp;&nbsp;</font>
                     <font color="black">{this.props.tr_receipt.status}</font>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="microchip" /><font color="#FF3800">&nbsp;CPU Usage&nbsp;&nbsp;&nbsp;</font>
                     <font color="black">{this.props.tr_receipt.cpu_usage_us} microseconds</font>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="wifi" /><font color="#FF3800">&nbsp;Net Usage&nbsp;&nbsp;&nbsp;</font>
                     <font color="black">{this.props.tr_receipt.net_usage_words} words</font>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon icon="link" /><font color="#FF3800">&nbsp;Block Number&nbsp;&nbsp;&nbsp;</font>
                     <font color="black">{this.props.tr_receipt.block_num}</font>
                  </MDBListGroupItem>
                  <MDBListGroupItem>
                     <MDBIcon far icon="clock" /><font color="#FF3800">&nbsp;Block Time&nbsp;&nbsp;&nbsp;</font>
                     <font color="black">{this.props.tr_receipt.block_time}</font>
                  </MDBListGroupItem>
               </MDBListGroup>
            </MDBCollapse>
         </React.Fragment>
      )
   }
}