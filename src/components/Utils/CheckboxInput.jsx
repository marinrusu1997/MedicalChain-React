import React from 'react'

export class CheckboxInput extends React.Component {

   onChangeHandler = event => this.props.changeHandler({ target: { name: event.target.name, value: event.target.checked } })

   render() {
      return (
         <div className="custom-control custom-checkbox pl-3">
            <input
               className="custom-control-input"
               type="checkbox"
               id={this.props.id}
               name={this.props.name}
               onChange={this.props.onChange}
               required
            />
            <label className="custom-control-label" htmlFor={this.props.id}>
               {this.props.label}
            </label>
            <div className="invalid-feedback">
               {this.props.invalid_feedback}
            </div>
         </div>
      )
   }
}