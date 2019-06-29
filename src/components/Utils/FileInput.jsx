import React from "react"
import { MDBIcon } from "mdbreact";

export class FileInput extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         label: this._getLabelName()
      }
   }

   _getLabelName = () => this.props.label ? <font color="grey">{this.props.label}</font> : <font color="grey">Choose medical record ...</font>

   _getInvalidFeedbackMsg = () => this.props.invalid_feedback ? this.props.invalid_feedback : "Please select the patient medical record"

   onFileSelected = event => {
      if (event.target.files.length === 1) {
         const fileDetails = event.target.files[0]
         this.props.onFileSelected(fileDetails)
         this.setState({ label: fileDetails.name })
      } else {
         this.props.onFileSelected(null)
         this.setState({ label: this._getLabelName() })
      }
   }

   render() {
      const inputStyle = { 'width': '90%', 'float': 'right' }
      const paragraphStyle = { 'width': '10%' }
      return (
         <React.Fragment>
            <div className="custom-file" style={inputStyle}>
               <input
                  id={this.props.id}
                  type="file"
                  className="custom-file-input"
                  accept={this.props.fileExtensions}
                  onChange={this.onFileSelected}
                  required
               />
               <label className="custom-file-label" htmlFor={this.props.id}>
                  {this.state.label}
               </label>
               <div className="invalid-feedback">
                  {this._getInvalidFeedbackMsg()}
               </div>
            </div>
            <p style={paragraphStyle}>
               <MDBIcon
                  className={this.props.icon.className}
                  icon={this.props.icon.type}
                  size="2x"
               />
            </p>
         </React.Fragment>
      )
   }
}

