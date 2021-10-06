import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
// This is the component
import CreateServer from './create_server';
// This is the thunk action
import { getServerCreate } from '../../actions/server_actions';

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId],
})

const mapDispatchToProps = dispatch => ({
   getServerCreate: formServer => dispatch(getServerCreate(formServer)),
   closeModal: () => dispatch(closeModal),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateServer);