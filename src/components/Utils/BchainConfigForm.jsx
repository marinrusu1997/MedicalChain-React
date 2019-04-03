import React from 'react'
import { MDBInput } from 'mdbreact'
import Toggle from 'react-bootstrap-toggle'

export class BchainConfigForm extends React.Component {
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
                  name='host'
                  value={this.props.config.host}
                  onChange={this.props.onInputChange}
                  label="Host (domain.com or ip)"
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
                  label="Port"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="desktop"
                  type="number"
                  required
               />
               <MDBInput
                  name='chainId'
                  value={this.props.config.chainId}
                  onChange={this.props.onInputChange}
                  label="Chain ID (optional)"
                  iconClass="teal-text"
                  className={this.props.inputClassName}
                  icon="fingerprint"
                  type="textarea"
                  rows="2"
               />
            </div>
            {this.props.children}
         </form>
      )
   }
}