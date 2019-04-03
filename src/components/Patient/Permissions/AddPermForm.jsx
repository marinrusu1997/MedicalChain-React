import React from 'react'
import { MDBCard, MDBCardBody, MDBInput, MDBIcon } from 'mdbreact'
import Toggle from 'react-bootstrap-toggle'
import { Typeahead } from 'react-bootstrap-typeahead'

import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css'
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css'

export class AddPermForm extends React.Component {
   constructor(props) {
      super(props)
      this.rights = []
      props.perm.rightsNomenclatory.forEach((id, right) => {
         this.rights.push(right)
      })
      this.specialities = []
      props.perm.specialitiesNomenclatory.forEach((id, specialty) => {
         this.specialities.push(specialty)
      })
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      this.date_hint = date.toJSON().slice(0, 10) + "T" + (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes)

      this.state = { toggleActive: false };
      this.onToggle = this.onToggle.bind(this);
   }

   submitHandler = event => {
      event.preventDefault()
      event.target.className = "needs-validation was-validated"
   }

   onToggle() {
      this.props.onInputChange({ target: { name: 'interval', value: !this.state.toggleActive ? 'INFINITE' : 'LIMITED' } })
      this.setState({ toggleActive: !!!this.state.toggleActive })
   }

   render() {
      return (
         <MDBCard>
            <MDBCardBody>
               <form className="needs-validation" onSubmit={this.submitHandler} noValidate>
                  <div className="grey-text">
                     <MDBInput
                        name='doctor'
                        onChange={this.props.onInputChange}
                        label="Doctor account"
                        iconClass="teal-text"
                        icon="user-md"
                        type="text"
                        required
                     />
                     <center style={{ margin: '20px 20px' }}>
                        <Toggle
                           data-attr-best="Take That"
                           active={this.state.toggleActive}
                           onstyle="danger"
                           offstyle="success"
                           onClick={this.onToggle}
                           on={<b>INFINITE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>}
                           off={<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LIMITED</b>}
                           recalculateOnResize={true}
                        />
                     </center>
                     {!!!this.state.toggleActive &&
                        <MDBInput
                           name='start'
                           onChange={this.props.onInputChange}
                           label="Start time"
                           iconClass="teal-text"
                           icon="hourglass-start"
                           type="datetime-local"
                           hint={this.date_hint}
                           required
                        />
                     }
                     {!!!this.state.toggleActive &&
                        <MDBInput
                           name='stop'
                           onChange={this.props.onInputChange}
                           label="End time"
                           iconClass="teal-text"
                           icon="hourglass-end"
                           type="datetime-local"
                           hint={this.date_hint}
                           required
                        />
                     }
                     <Typeahead
                        id="specialty-dropdown"
                        flip={true}
                        highlightOnlyResult={true}
                        selectHintOnEnter={true}
                        options={this.specialities}
                        placeholder="Choose a specialty..."
                        onChange={specialties => this.props.onInputChange({ target: { name: 'specialty', value: specialties[0] } })}
                        style={{ 'width': '90%', 'float': 'right' }}
                     />
                     <p style={{ 'width': '10%' }}><MDBIcon className="teal-text" icon="hospital-symbol" size="2x" /></p>
                     <Typeahead
                        id="rigt-dropdown"
                        flip={true}
                        highlightOnlyResult={true}
                        selectHintOnEnter={true}
                        options={this.rights}
                        placeholder="Choose a right..."
                        onChange={rights => this.props.onInputChange({ target: { name: 'right', value: rights[0] } })}
                        style={{ 'width': '90%', 'float': 'right' }}
                     />
                     <p style={{ 'width': '10%' }}><MDBIcon className="teal-text" icon="book-reader" size="2x" /></p>
                  </div>
                  {this.props.children}
               </form>
            </MDBCardBody>
         </MDBCard>
      )
   }
}