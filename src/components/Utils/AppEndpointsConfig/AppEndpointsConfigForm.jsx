import React from 'react'
import { MDBInput } from 'mdbreact'
import Toggle from 'react-bootstrap-toggle'

export class AppEndpointsConfigForm extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         toggleActive: false
      }
   }

   onToggle = () => {
      this.props.onInputChange({ target: { name: 'protocol', value: this.state.toggleActive ? 'http' : 'https' } })
      this.setState({ toggleActive: !!!this.state.toggleActive })
   }

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   render() {
      return (
         <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
            <div className="grey-text">
               <center style={{ margin: '20px 20px' }}>
                  <Toggle
                     data-attr-best="Take That"
                     active={this.state.toggleActive}
                     onstyle="success"
                     offstyle="danger"
                     onClick={this.onToggle}
                     on={<b>HTTPS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>}
                     off={<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTTP</b>}
                  />
               </center>
               <MDBInput
                  name='blockchain'
                  value='EOS'
                  label="Blockchain"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="shield-alt"
                  type="text"
                  required
                  disabled
               />
               <MDBInput
                  name='chainId'
                  value={this.props.config.chainId}
                  onChange={this.props.onInputChange}
                  label="Chain Id"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="fingerprint"
                  type="textarea"
                  rows="1"
                  disabled
               />
               <MDBInput
                  name='host'
                  value={this.props.config.host}
                  onChange={this.props.onInputChange}
                  label="Blockchain Host (domain.com or ip)"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="globe-europe"
                  type="text"
                  required
               />
               <MDBInput
                  name='port'
                  value={this.props.config.port}
                  onChange={this.props.onInputChange}
                  label="Blockchain Port"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="desktop"
                  type="number"
                  required
               />
               <MDBInput
                  name='indentification_address'
                  value={this.props.config.indentification_address}
                  onChange={this.props.onInputChange}
                  label="Identification Service Address (Optional)"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="id-card"
                  type="text"
               />
               <MDBInput
                  name='wallet_address'
                  value={this.props.config.wallet_address}
                  onChange={this.props.onInputChange}
                  label="Wallet Service Address (Optional)"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="wallet"
                  type="text"
               />
            </div>
            {this.props.children}
         </form>
      )
   }
}