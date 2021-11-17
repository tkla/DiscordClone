import Channels from './channels'
import {connect} from 'react-redux'
import { getChannelDestroy, getChannelsIndex } from '../../actions/channel_actions';
import { getServerLeave, getServerDestroy, getServerShow } from '../../actions/server_actions';
import { getPostsIndex } from '../../actions/post_actions';
import { openModal } from '../../actions/modal_actions';
import { getUserShow } from '../../actions/user_actions';

const mapState = (state) => ({
   currentUser: state.entities.users[state.session.currentUserId],
   channels: state.entities.channels,
   servers: state.entities.servers
})

const mapDispatch = (dispatch) => ({
   // Server
   getServerLeave: serverId => dispatch(getServerLeave(serverId)),
   getServerDestroy: serverId => dispatch(getServerDestroy(serverId)),
   getServerShow: serverId => dispatch(getServerShow(serverId)),
   // Posts
   getPostsIndex: channelId => dispatch(getPostsIndex(channelId)),
   // Channels
   getChannelsIndex: (serverId) => dispatch(getChannelsIndex(serverId)),
   getChannelDestroy: channelId => dispatch(getChannelDestroy(channelId)),
   // Receive updated user from backend
   getUserShow: userId => dispatch(getUserShow(userId)),
   // Modals
   openNewChannel: () => dispatch(openModal('createChannel')),
   openServerEdit: () => dispatch(openModal('editServer')),
})

export default connect(mapState, mapDispatch)(Channels);