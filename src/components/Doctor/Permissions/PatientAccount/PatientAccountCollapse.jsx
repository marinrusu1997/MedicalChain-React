import React from 'react'
import { MDBCollapse, MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact'

export class PatientAccountCollapse extends React.Component {
   render() {
      return (
         <React.Fragment>
            <center>
               <font color="#006400">Account Names</font>
               <button onClick={this.props.onCollapse} type="button" className="btn btn-outline-info btn-sm"><MDBIcon icon="angle-down" /></button>
            </center>
            <MDBCollapse isOpen={this.props.isCollapsed}>
               {
                  this.props.accounts.map(account => (
                     <MDBListGroup key={account.account}>
                        <MDBListGroupItem>
                           <MDBIcon icon="user-circle" /><font color="#FF3800">&nbsp;Account&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{account.account}</font>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                           <MDBIcon far icon="calendar-alt" /><font color="#FF3800">&nbsp;Birthday&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{account.birthday}</font>
                        </MDBListGroupItem>
                     </MDBListGroup>
                  ))
               }
            </MDBCollapse>
         </React.Fragment>
      )
   }
}