import React from "react"
import { MDBIcon } from "mdbreact";

export class FileInput extends React.Component {

   constructor(props) {
      super(props)
      this.state = {
         label: this._getDefaultLabelName()
      }
   }

   _getDefaultLabelName = () => <font color="grey">Choose medical record ...</font>

   onFileSelected = event => {
      if (event.target.files.length === 1) {
         const fileDetails = event.target.files[0]
         this.props.onFileSelected(fileDetails)
         this.setState({ label: fileDetails.name })
      } else {
         this.props.onFileSelected(null)
         this.setState({ label: this._getDefaultLabelName() })
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
                  Please select the patient medical record
               </div>
            </div>
            <p style={paragraphStyle}><MDBIcon className={this.props.icon.className} icon={this.props.icon.type} size="2x" /></p>
         </React.Fragment>
      )
   }
}

