import React from 'react'
import { connect } from 'react-redux'
import { errorToast } from '../../Utils/Toasts'
import { MDBBtn } from "mdbreact"

class _CheckForPermBtn extends React.Component {

   constructor(props) {
      super(props)

      this.permNomenclatories = null
      this.reversedRightsNomenclatory = null
      this.reversedSpecialitiesNomenclatory = null
   }

   componentDidMount() {
      this._tryPreparePermInfoForUpsertForm()
   }

   __prepareReversedNomenclatories = () => {
      this.reversedRightsNomenclatory = new Map()
      this.props.rightsNomenclatory.forEach((v, k) => this.reversedRightsNomenclatory.set(v, k))
      this.reversedSpecialitiesNomenclatory = new Map()
      this.props.specialitiesNomenclatory.forEach((v, k) => this.reversedSpecialitiesNomenclatory.set(v, k))
   }

   __areNomeclatoriesPrepared = () => {
      return this.permNomenclatories !== null
   }

   __tryPrepareReversedNomenclatories = () => {
      if (this.props.rightsNomenclatory && this.props.specialitiesNomenclatory) {
         this.__prepareReversedNomenclatories()
         this.permNomenclatories = {
            rightsNomenclatory: this.reversedRightsNomenclatory,
            specialitiesNomenclatory: this.reversedSpecialitiesNomenclatory
         }
         return true
      }
      return false
   }

   _tryPreparePermInfoForUpsertForm = () => {
      try {
         this.__tryPrepareReversedNomenclatories()
      } catch (e) {
         errorToast(e.name + ': ' + e.message)
      }
   }

   onCheckForPermsHandler = () => {
      if (this.__areNomeclatoriesPrepared() || this.__tryPrepareReversedNomenclatories()) {
         this.props.onCheckForPerms(this.permNomenclatories)
      } else {
         errorToast('Nomenclatories are not loaded')
      }
   }

   render() {
      return (
         <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.onCheckForPermsHandler}>
            <i className="fa fa-check-circle"></i>
         </MDBBtn>
      )
   }
}

const mapStateToProps = state => {
   return {
      rightsNomenclatory: state.blockchain.rights,
      specialitiesNomenclatory: state.blockchain.specialities
   }
}

export const CheckForPermBtn = connect(mapStateToProps, null)(_CheckForPermBtn)