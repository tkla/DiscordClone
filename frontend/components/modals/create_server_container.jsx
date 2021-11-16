import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
// This is the component
import CreateServer from './create_server';
// This is the thunk action
import { getServerCreate, getServerEdit } from '../../actions/server_actions';
// Clear errors from errors slice
import { clearErrors } from '../../actions/session_actions';

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId],
   servers: state.entities.servers,
   errors: state.errors.session,
})

const mapDispatchToProps = dispatch => ({
   getServerCreate: formServer => dispatch(getServerCreate(formServer)),
   getServerEdit: (id, formServer) => dispatch(getServerEdit(id, formServer)),
   closeModal: () => dispatch(closeModal),
   clearErrors: () => dispatch(clearErrors()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateServer);