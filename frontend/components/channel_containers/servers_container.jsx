import Servers from './servers';
import {connect} from 'react-redux';
import { getUserServers } from '../../actions/server_actions';
import { openModal } from '../../actions/modal_actions';

const mapState = (state) => ({
   servers: state.entities.servers,
   currentUser: state.entities.users[state.session.currentUserId],
})

const mapDispatch = (dispatch) => ({
   getUserServers: () => dispatch(getUserServers()),
   openCreateServer: () => dispatch(openModal('createServer')),
   openJoinServer: () => dispatch(openModal('joinServer'))
})

export default connect(mapState, mapDispatch)(Servers);