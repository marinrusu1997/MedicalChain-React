import React from 'react'
import { connect } from 'react-redux'
import {
   MDBContainer,
   MDBModal,
   MDBModalHeader,
   MDBModalBody,
   MDBIcon,
   MDBListGroup,
   MDBListGroupItem,
   MDBCollapse
} from 'mdbreact'
import { accountInfoHasBeenSeenAction } from '../../store/Registration/Account Display/actions'
import { CopyToClipboard } from 'react-copy-to-clipboard'

class AccountModal extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         isCollapsed: false
      }
   }

   toggle = () => {
      this.props.accountInfoHasBeenSeenAction()
   }

   collapse = () => {
      this.setState({ isCollapsed: !!!this.state.isCollapsed })
   }

   render() {
      return (
         <MDBContainer>
            <MDBModal isOpen={this.props.showDetails} toggle={this.toggle} cascading size="lg">
               <MDBModalHeader
                  toggle={this.toggle}
                  titleClass="d-inline title"
                  className="text-center green darken-2 white-text">
                  <MDBIcon icon="user-circle" />  Account created successfully!
                  </MDBModalHeader>
               <MDBModalBody>
                  <center>
                     <h4>
                        <strong>
                           <font color="red">
                              <p>Import these credentials into your Scatter wallet!</p>
                              <p>After closing modal, application will forget them!</p>
                           </font>
                        </strong>
                     </h4>
                  </center>
                  <MDBListGroup>
                     <MDBListGroupItem>
                        <MDBIcon icon="user-shield" /><font color="blue">&nbsp;Account Name&nbsp;&nbsp;&nbsp;</font>
                        <font color="black">{this.props.accountDetails.name}</font>
                     </MDBListGroupItem>
                     <MDBListGroupItem>
                        <MDBIcon icon="key" /><font color="blue">&nbsp;&nbsp;Owner Key &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                        <font color="black">{this.props.accountDetails.keys.owner}</font>
                     </MDBListGroupItem>
                     <MDBListGroupItem>
                        <MDBIcon icon="key" /><font color="blue">&nbsp;&nbsp;Active Key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                        <font color="black">{this.props.accountDetails.keys.active}</font>
                     </MDBListGroupItem>
                     <MDBListGroupItem>
                        <MDBIcon icon="key" />
                        <font color="blue">&nbsp;&nbsp;Encryption Key&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</font>
                        <CopyToClipboard text={this.props.accountDetails.keys.encryption}>
                           <button type="button" className="btn btn-outline-danger btn-sm">Copy</button>
                        </CopyToClipboard>
                     </MDBListGroupItem>
                  </MDBListGroup>
                  <p></p>
                  <center>
                     <p>
                        <font color="#006400">Transaction details</font>
                        <button onClick={this.collapse} type="button" className="btn btn-outline-info btn-sm"><MDBIcon icon="angle-down" /></button>
                     </p>
                  </center>
                  <MDBCollapse isOpen={this.state.isCollapsed}>
                     <MDBListGroup>
                        <MDBListGroupItem>
                           <MDBIcon icon="fingerprint" /><font color="#FF3800">&nbsp;Id&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{this.props.accountDetails.transaction.id}</font>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                           <MDBIcon far icon="check-circle" /><font color="#FF3800">&nbsp;Status&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{this.props.accountDetails.transaction.status}</font>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                           <MDBIcon icon="microchip" /><font color="#FF3800">&nbsp;CPU Usage&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{this.props.accountDetails.transaction.cpu_usage_us} microseconds</font>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                           <MDBIcon icon="wifi" /><font color="#FF3800">&nbsp;Net Usage&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{this.props.accountDetails.transaction.net_usage_words} words</font>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                           <MDBIcon icon="link" /><font color="#FF3800">&nbsp;Block Number&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{this.props.accountDetails.transaction.block_num}</font>
                        </MDBListGroupItem>
                        <MDBListGroupItem>
                           <MDBIcon far icon="clock" /><font color="#FF3800">&nbsp;Block Time&nbsp;&nbsp;&nbsp;</font>
                           <font color="black">{this.props.accountDetails.transaction.block_time}</font>
                        </MDBListGroupItem>
                     </MDBListGroup>
                  </MDBCollapse>
               </MDBModalBody>
            </MDBModal>
         </MDBContainer>
      )
   }
}

const mapStateToProps = state => {
   return {
      showDetails: state.registration.accountDisplay.showDetails,
      accountDetails: state.registration.accountDisplay.accountDetails
   }
}

const mapDispatchToProps = {
   accountInfoHasBeenSeenAction
}


export default connect(mapStateToProps, mapDispatchToProps)(AccountModal)