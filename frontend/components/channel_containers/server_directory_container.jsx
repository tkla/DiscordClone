import ServerDirectory from './server_directory'
import {connect} from 'react-redux'
import { clearServers, getServersIndex, getUserServers, getServerJoin } from '../../actions/server_actions'

const mapState = (state) => ({
   servers: state.entities.servers,
   users: state.entities.users,
   currentUserId: state.session.currentUserId
})

const mapDispatch = dispatch => ({
   clearServers: () => dispatch(clearServers()),
   getServersIndex: () => dispatch(getServersIndex()),
   getUserServers: () => dispatch(getUserServers()),
   getServerJoin: userId => dispatch(getServerJoin(userId)),
   
})

export default connect(mapState, mapDispatch)(ServerDirectory);