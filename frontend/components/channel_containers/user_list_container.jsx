import UserList from './user_list'
import {connect} from 'react-redux'
import { getUserServers } from '../../actions/server_actions'

const mapState = (state) => ({
   users: state.entities.users,
   servers: state.entities.servers 
})

const mapDispatch = (dispatch) => ({
   getUserServers: serverId => dispatch(getUserServers(serverId)),
})

export default connect(mapState, mapDispatch)(UserList);