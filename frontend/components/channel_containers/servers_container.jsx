import Servers from './servers'
import {connect} from 'react-redux'
import { getUserServers } from '../../actions/server_actions'
import { getChannelsIndex } from '../../actions/channel_actions'

const mapState = (state) => ({
   servers: state.entities.servers,
   users: state.entities.users,
   channels: state.entities.channels,
   currentUserId: state.session.currentUserId
})

const mapDispatch = (dispatch) => ({
   getUserServers: () => dispatch(getUserServers()),
   getChannelsIndex: serverId => dispatch(getChannelsIndex(serverId)),
})

export default connect(mapState, mapDispatch)(Servers);