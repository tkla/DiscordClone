import UserList from './user_list'
import {connect} from 'react-redux'
import { getUserServers } from '../../actions/server_actions'
import { getUsersIndex } from '../../actions/user_actions'

const mapState = (state) => ({
   users: state.entities.users,
   currentUser: state.entities.users[state.session.currentUserId],
   servers: state.entities.servers 
})

const mapDispatch = (dispatch) => ({
   getUserServers: serverId => dispatch(getUserServers(serverId)),
   getUsersIndex: serverId => dispatch(getUsersIndex(serverId)),
})

export default connect(mapState, mapDispatch)(UserList);