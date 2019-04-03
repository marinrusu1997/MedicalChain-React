import React from 'react'
import { connect } from 'react-redux'
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBDataTable, MDBIcon } from 'mdbreact'
import Toggle from 'react-bootstrap-toggle'

import 'react-bootstrap-toggle/dist/bootstrap2-toggle.css'
import '../../../css/buttons.css'

import { eosio_client } from '../../../blockchain/eosio-wallet-client'
import { errorToast, succToast, infoToast } from '../../Utils/Toasts'
import { PermissionModal } from './PermissionModal'
import { ConfirmationModal } from '../../Utils/ConfirmationModal'

const table_mapping = {
   columns: [
      {
         label: [<i key="Change" className="fa fa-edit mr-2 teal-text" aria-hidden="true"></i>, 'Change'],
         field: 'change',
         width: 50
      },
      {
         label: [<i key="Specialty" className="fa fa-hospital-symbol mr-2 teal-text" aria-hidden="true"></i>, 'Specialty'],
         field: 'specialty',
         sort: 'asc',
         width: 200
      },
      {
         label: [<i key="Doctor" className="fa fa-user-md mr-2 teal-text" aria-hidden="true"></i>, 'Doctor'],
         field: 'doctor',
         sort: 'asc',
         width: 150
      },
      {
         label: [<i key="Account" className="fa fa-user-circle mr-2 teal-text" aria-hidden="true"></i>, 'Account'],
         field: 'account',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="Right" className="fa fa-book-reader mr-2 teal-text" aria-hidden="true"></i>, 'Right'],
         field: 'right',
         sort: 'asc',
         width: 100
      },
      {
         label: [<i key="Start time" className="fa fa-hourglass-start mr-2 teal-text" aria-hidden="true"></i>, 'Start time'],
         field: 'start_time',
         sort: 'asc',
         width: 150
      },
      {
         label: [<i key="End time" className="fa fa-hourglass-end mr-2 teal-text" aria-hidden="true"></i>, 'End time'],
         field: 'end_time',
         sort: 'asc',
         width: 150
      }
   ],
   rows: []
}
/*
const cachedPermissions = {
   isDirty: false,
   perms: [],
}

const setCachedPermissions = perms => {
   cachedPermissions.isDirty = false
   cachedPermissions.perms = perms
}

const resetCachedPermissions = () => {
   cachedPermissions.isDirty = false
   cachedPermissions.perms = []
}

const addPermToCachedPermissions = perm => {
   cachedPermissions.perms.push(perm)
}

const areChachedPermissionsValid = () => cachedPermissions.perms.length !== 0 && !!!cachedPermissions.isDirty

const getCachedPermissions = () => cachedPermissions.perms

*/

class _PatientPermissions extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         perm_modal: {
            isOpen: false,
            isAddingModal: true
         },
         confirm_modal: {
            isOpen: false,
            text: {
               title: '',
               body: ''
            },
            info: {},
            choice: {}
         },
         tr_receipt: null,
         table: table_mapping
      }
      this.permInfoForModal = null
      this.onUpsertHandler = null
      this.reversedRightsNomenclatory = null
      this.reversedSpecialitiesNomenclatory = null
      this.toggleMap = new Map()
      this.permIdsCheduledForChanging = []
   }

   componentDidMount() {
      this._getPermsDatasetAsync()
   }

   __retrieveDoctorName = account => account + ' Implement prefetch of doctors from server'

   __getNormalizedDateTime = posix => {
      const date = new Date(posix * 1000)
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return date.toJSON().slice(0, 10) + "T" + (hours > 9 ? hours : "0" + hours) + ":" + (minutes > 9 ? minutes : "0" + minutes)
   }

   _updateRowsScheduledForChanging = (schedule, id_perm_of_doctor) => {
      if (schedule) {
         this.permIdsCheduledForChanging.push(id_perm_of_doctor)
      } else {
         this.permIdsCheduledForChanging.splice(this.permIdsCheduledForChanging.indexOf(id_perm_of_doctor), 1)
      }
   }

   __makeTogleForChangeScheduling = (id, doctor, active) => (
      <Toggle
         key={id}
         id={id}
         active={active}
         onstyle="success"
         offstyle="danger"
         on={<b>YES&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>}
         off={<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;NO</b>}
         onClick={this.onToggle({ id: id, doctor: doctor })}
         size='sm'
      />
   )

   onToggle = id_perm_of_doctor => () => {
      const newActiveState = !!!this.toggleMap.get(id_perm_of_doctor.id)
      this.toggleMap.set(id_perm_of_doctor.id, newActiveState)

      const modifiedRows = [...this.state.table.rows]

      for (const row of modifiedRows) {
         if (row.change.props.id === id_perm_of_doctor.id) {
            row.change = this.__makeTogleForChangeScheduling(id_perm_of_doctor.id, id_perm_of_doctor.doctor, newActiveState)
            break
         }
      }

      this._updateRowsScheduledForChanging(newActiveState, id_perm_of_doctor)
      //setCachedPermissions(modifiedRows)
      this.setState({ table: { columns: table_mapping.columns, rows: modifiedRows } })
   }

   __makePermRow = (perm_info, doctor) => {
      if (!!!this.props.rightsNomenclatory || !!!this.props.specialitiesNomenclatory)
         throw new Error("Nomenclatures were not loaded")
      this.toggleMap.set(perm_info.id, false)
      return {
         change: this.__makeTogleForChangeScheduling(perm_info.id, doctor, false),
         specialty: this.props.specialitiesNomenclatory.get(perm_info.specialtyid),
         doctor: this.__retrieveDoctorName(doctor),
         account: doctor,
         right: this.props.rightsNomenclatory.get(perm_info.right),
         start_time: perm_info.interval.from === 0 ? 'INFINITE' : this.__getNormalizedDateTime(perm_info.interval.from),
         end_time: perm_info.interval.to === 0 ? 'INFINITE' : this.__getNormalizedDateTime(perm_info.interval.to)
      }
   }

   __getNormalizedPerms = (perms, permsInfo) => {
      const normalized = []
      try {
         const permsInfoMap = new Map()
         permsInfo.forEach(permInfo => {
            permsInfoMap.set(permInfo.id, permInfo)
         })
         perms.forEach(permKVObj => {
            permKVObj.value.forEach(permId => {
               const perm = permsInfoMap.get(permId)
               normalized.push(this.__makePermRow(perm, permKVObj.key))
            })
         })
      } catch (e) {
         console.error(e)
         errorToast(e.name + ' : ' + e.message)
      }
      return normalized
   }

   _getGreatestPermId = perms_by_doctor => {
      let greatest = 0
      perms_by_doctor.forEach(permKV => {
         permKV.value.forEach(perm_id => {
            if (perm_id > greatest)
               greatest = perm_id
         })
      })
      return greatest
   }

   __retrieveLastAddedPermFromBlockchain = async doctor => {
      try {
         const _records = await eosio_client.records()
         const _doctor_perms = _records.rows[0].perms.find(permKV => permKV.key === doctor)
         const greatestPermId = this._getGreatestPermId(_records.rows[0].perms)
         const _perms = await eosio_client.permissions_from_limit(greatestPermId)

         if (_perms.more !== false || _perms.rows.length !== 1) {
            errorToast('Failed to retrieve last added perm from blockchain, reload the page in order to reflect the latest changes')
            console.error(greatestPermId, _perms)
            return
         }
         const latest_perm = _perms.rows[0]

         if (_doctor_perms.value.find(permid => permid === latest_perm.id) !== latest_perm.id) {
            errorToast('Latest permission id does not belong to doctor ' + doctor + ', reload the page in order to reflect the latest changes')
            return
         }

         const permRow = this.__makePermRow(latest_perm, doctor)

         this.setState({ table: { columns: table_mapping.columns, rows: [...this.state.table.rows, permRow] } })
         //addPermToCachedPermissions(permRow)
      } catch (e) {
         console.error(e)
         errorToast('Error retrieving perms from blockchain' + ' : ' + e.message)
      }
   }

   _requestPermsFromBlockchain = async () => {
      try {
         const _records = await eosio_client.records()
         if (!!!_records.rows.length) {
            errorToast("Seems that you are not registered yet")
            //resetCachedPermissions()
            return
         }
         if (!!!_records.rows[0].perms.length) {
            errorToast("You don't have any permissions")
            //resetCachedPermissions()
            return
         }
         const noOfPerms = _records.rows[0].perms.reduce((accumulator, current) => accumulator + current.value.length, 0)
         const _perms = await eosio_client.permissions(noOfPerms)
         if (_perms.more) {
            errorToast('Some permissions have remained unloaded from the blockchain')
         }
         //setCachedPermissions(this.__getNormalizedPerms(_records.rows[0].perms, _perms.rows))
         //this.setState({ table: { columns: table_mapping.columns, rows: getCachedPermissions() } })
         this.setState({ table: { columns: table_mapping.columns, rows: this.__getNormalizedPerms(_records.rows[0].perms, _perms.rows) } })
      } catch (e) {
         console.error(e)
         errorToast(e.name + ' : ' + e.message)
      }
   }

   /*  __getNormalizedPermRowsFromCache = rows => {
        for (const row of rows) {
           this.toggleMap.set(row.change.props.id, false)
           row.change = this.__makeTogleForChangeScheduling(row.change.props.id, false)
        }
        setCachedPermissions(rows)
        return rows
     } */

   _getPermsDatasetAsync = () => {
      try {
         /*  if (areChachedPermissionsValid()) {
              console.log('from cache')
              this.setState({
                 table: {
                    columns: table_mapping.columns,
                    rows: this.__getNormalizedPermRowsFromCache(getCachedPermissions())
                 }
              })
              return
           } */
         if (!!!eosio_client.is_connected()) {
            eosio_client.connect(this._requestPermsFromBlockchain, msg => errorToast(msg))
         } else {
            this._requestPermsFromBlockchain()
         }
      } catch (e) {
         console.error(e)
         errorToast(e.name + ': ' + e.message)
      }
   }

   _showPermModal = isAddingModal => {
      this.setState({ perm_modal: { isOpen: true, isAddingModal: isAddingModal } })
   }

   _toglePermModal = () => this.setState({ perm_modal: { isOpen: false }, tr_receipt: null })

   __checkForReversedNomenclatories = () => {
      if (!!!this.reversedRightsNomenclatory || !!!this.reversedSpecialitiesNomenclatory) {
         this.reversedRightsNomenclatory = new Map()
         this.props.rightsNomenclatory.forEach((v, k) => this.reversedRightsNomenclatory.set(v, k))
         this.reversedSpecialitiesNomenclatory = new Map()
         this.props.specialitiesNomenclatory.forEach((v, k) => this.reversedSpecialitiesNomenclatory.set(v, k))
      }
   }

   _tryPreparePermInfoForAddingForm = () => {
      try {
         if (!!!this.props.rightsNomenclatory || !!!this.props.specialitiesNomenclatory)
            throw new Error("Can't load nomenclatures")
         this.__checkForReversedNomenclatories()
         this.permInfoForModal = {
            rightsNomenclatory: this.reversedRightsNomenclatory,
            specialitiesNomenclatory: this.reversedSpecialitiesNomenclatory
         }
         return true
      } catch (e) {
         errorToast(e.name + ': ' + e.message)
         return false
      }
   }

   addPermHandler = () => {
      if (this._tryPreparePermInfoForAddingForm()) {
         this.onUpsertHandler = this._preparedAddHandlerForModal
         this._showPermModal(true)
      }
   }

   _onAddPermSuccess = doctor => receipt => {
      succToast('Permission was added')
      this.setState({
         tr_receipt: {
            id: receipt.transaction_id,
            status: receipt.processed.receipt.status,
            cpu_usage_us: receipt.processed.receipt.cpu_usage_us,
            net_usage_words: receipt.processed.receipt.net_usage_words,
            block_num: receipt.processed.block_num,
            block_time: receipt.processed.block_time
         }
      })
      this.__retrieveLastAddedPermFromBlockchain(doctor)
   }

   _preparedAddHandlerForModal = perm => {
      eosio_client.add_permission
         (
            perm,
            this._onAddPermSuccess(perm.doctor),
            err_msg => errorToast(err_msg)
         )
   }

   updatePermHandler = async () => {
      this._showPermModal(false)
   }

   __onSuccessfullDeletion = id_perm_of_doctor => receipt => {
      this.permIdsCheduledForChanging.splice(this.permIdsCheduledForChanging.indexOf(id_perm_of_doctor), 1)
      this.setState({
         table: {
            columns: table_mapping.columns,
            rows: this.state.table.rows.filter(row => row.change.props.id !== id_perm_of_doctor.id)
         }
      })
      succToast(`Permission that belonged to doctor ${id_perm_of_doctor.doctor} with id ${id_perm_of_doctor.id} was removed `)
   }

   _doDeletePerms = async () => {
      this.permIdsCheduledForChanging.forEach(id_perm_of_doctor => {
         eosio_client.rm_permission({ id: id_perm_of_doctor.id, doctor: id_perm_of_doctor.doctor },
            this.__onSuccessfullDeletion(id_perm_of_doctor),
            err_msg => errorToast(err_msg))
      })
   }

   deletePermsHandler = () => {
      if (this.permIdsCheduledForChanging.length === 0) {
         this.setState({
            confirm_modal: {
               isOpen: true,
               text: {
                  title: <em><MDBIcon icon="trash" /> &nbsp;&nbsp;Delete Permissions</em>,
                  body: <b>You don't have any selected permissions. Please select at least one by toggling the button from the <mark>Change</mark> column</b>,
                  info_btn: 'Close'
               },
               info: {
                  isActive: true,
                  info_handler: this._togleConfirmModal
               },
               choice: {}
            }
         })
      } else if (this.permIdsCheduledForChanging.length === 1) {
         this.setState({
            confirm_modal: {
               isOpen: true,
               text: {
                  title: <em><MDBIcon icon="trash" /> &nbsp;&nbsp;Delete Permissions</em>,
                  body:
                     <b>
                        <p>
                           You have selected permission with id <mark>{this.permIdsCheduledForChanging[0].id}</mark>&nbsp;
                           which belongs to doctor account <mark>{this.permIdsCheduledForChanging[0].doctor}</mark>
                        </p>
                        <strong>
                           {'Are you sure you want to delete it?'}
                        </strong>
                     </b>,
                  pos_choice_btn: <b>Yes</b>,
                  neg_choice_btn: <b>No</b>
               },
               choice: {
                  isActive: true,
                  pos_ch_handler: () => { this._togleConfirmModal(); this._doDeletePerms() },
                  neg_ch_handler: this._togleConfirmModal
               },
               info: {}
            }
         })
      } else {
         infoToast('Due to the long delay of signing transaction with scatter wallet, we recommend you to select only 1 permission for further changes.' +
            ' Multiple selection will be allowed in the near future')
      }
   }

   _togleConfirmModal = () => this.setState({ confirm_modal: { isOpen: false, text: this.state.confirm_modal.text, info: {}, choice: {} } })

   render() {
      return (
         <React.Fragment>
            <PermissionModal
               isOpen={this.state.perm_modal.isOpen}
               isAddingModal={this.state.perm_modal.isAddingModal}
               toggle={this._toglePermModal}
               permission={this.permInfoForModal}
               onUpsert={this.onUpsertHandler}
               tr_receipt={this.state.tr_receipt}
            />
            <ConfirmationModal
               isOpen={this.state.confirm_modal.isOpen}
               toggle={this._togleConfirmModal}
               text={this.state.confirm_modal.text}
               info={this.state.confirm_modal.info.isActive}
               info_handler={this.state.confirm_modal.info.info_handler}
               choice={this.state.confirm_modal.choice.isActive}
               pos_ch_handler={this.state.confirm_modal.choice.pos_ch_handler}
               neg_ch_handler={this.state.confirm_modal.choice.neg_ch_handler}
            />
            <MDBCard narrow>
               <MDBCardHeader className="view view-cascade gradient-card-header green darken-2 d-flex justify-content-between align-items-center py-2 mx-4 mb-3">
                  <div>
                  </div>
                  <a href="#!" className="white-text mx-3">Permissions Management</a>
                  <div>
                     <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.addPermHandler}>
                        <i className="fa fa-plus-circle mt-0"></i>
                     </MDBBtn>
                     <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.updatePermHandler}>
                        <i className="fas fa-pencil-alt mt-0"></i>
                     </MDBBtn>
                     <MDBBtn outline rounded size="sm" color="white" className="px-2 btn-circle" onClick={this.deletePermsHandler}>
                        <i className="fas fa-times mt-0"></i>
                     </MDBBtn>
                  </div>
               </MDBCardHeader>
               <MDBCardBody cascade>
                  <MDBDataTable
                     entriesOptions={[10, 20, 30, 40, 50]}
                     infoLabel={["Showing", "to", "of", "permissions"]}
                     tbodyColor="blue lighten-5"
                     theadColor="purple lighten-5"
                     responsive
                     hover
                     small
                     data={this.state.table}
                  />
               </MDBCardBody>
            </MDBCard>
         </React.Fragment>
      )
   }
}

const mapStateToProps = state => {
   return {
      rightsNomenclatory: state.blockchain.rights,
      specialitiesNomenclatory: state.blockchain.specialities
   }
}

export const PatientPermissions = connect(mapStateToProps, null)(_PatientPermissions)