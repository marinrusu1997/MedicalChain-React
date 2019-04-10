import React from 'react'
import Toggle from 'react-bootstrap-toggle'
import { MDBInput } from 'mdbreact'

export class IntervalInput extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         toggleActive: this.props.interval === 'INFINITE' ? true : false
      }
      const date = new Date()
      const hours = date.getHours()
      const minutes = date.getMinutes()
      this.date_hint = date.toJSON().slice(0, 10) + "T" + (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes)
   }

   onToggle = () => {
      this.props.onInputChange({ target: { name: 'interval', value: !this.state.toggleActive ? 'INFINITE' : 'LIMITED' } })
      this.setState({ toggleActive: !!!this.state.toggleActive })
   }

   render() {
      return (
         <React.Fragment>
            <center style={{ margin: '20px 20px' }}>
               <Toggle
                  data-attr-best="Take That"
                  active={this.state.toggleActive}
                  onstyle="danger"
                  offstyle="success"
                  onClick={this.props.unmodifiable ? () => { } : this.onToggle}
                  on={<b>INFINITE&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>}
                  off={<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LIMITED</b>}
                  recalculateOnResize={true}
               />
            </center>
            {
               !!!this.state.toggleActive && this.props.start_time &&
               <MDBInput
                  name='start'
                  value={this.props.start_time}
                  onChange={this.props.onInputChange}
                  label="Start time"
                  iconClass="teal-text"
                  icon="hourglass-start"
                  type="datetime-local"
                  hint={this.start_time_hint}
                  required
               />
            }
            {
               !!!this.state.toggleActive && !!!this.props.start_time &&
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
            {
               !!!this.state.toggleActive && this.props.end_time &&
               <MDBInput
                  name='stop'
                  value={this.props.end_time}
                  onChange={this.props.onInputChange}
                  label="End time"
                  iconClass="teal-text"
                  icon="hourglass-end"
                  type="datetime-local"
                  required
               />
            }
            {
               !!!this.state.toggleActive && !!!this.props.end_time &&
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
         </React.Fragment>
      )
   }
}