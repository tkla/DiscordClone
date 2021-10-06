import Channels from './channels'
import {connect} from 'react-redux'
import { getChannelsIndex } from '../../actions/channel_actions';
import { getServerLeave, getUserServers } from '../../actions/server_actions';

const mapState = (state) => ({
   currentUser: state.entities.users[state.session.currentUserId],
   channels: state.entities.channels,
   servers: state.entities.servers
})

const mapDispatch = (dispatch) => ({
   getChannelsIndex: (serverId) => dispatch(getChannelsIndex(serverId)),
   getServerLeave: serverId => dispatch(getServerLeave(serverId)),
   getUserServers: () => dispatch(getUserServers()),
})

export default connect(mapState, mapDispatch)(Channels);