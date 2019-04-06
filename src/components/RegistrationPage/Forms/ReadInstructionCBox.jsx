import React from 'react'

export class ReadInstrutionsCBox extends React.Component {
   render() {
      return (
         <div className="custom-control custom-checkbox pl-3">
            <input
               name={this.props.input_name}
               onChange={this.props.changeHandler}
               required
               className="custom-control-input"
               type="checkbox"
               id="read_instruction_cb"
            />
            <label className="custom-control-label" htmlFor="read_instruction_cb">
               I read the instruction for registration
            </label>
            <div className="invalid-feedback">
               You must read the instruction before registering.
            </div>
         </div>
      )
   }
}