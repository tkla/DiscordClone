import Channels from './channels'
import {connect} from 'react-redux'
import { getChannelsIndex } from '../../actions/channel_actions';

const mapState = (state) => ({
   channels: state.entities.channels,
   servers: state.entities.servers
})

const mapDispatch = (dispatch) => ({
   getChannelsIndex: (serverId) => dispatch(getChannelsIndex(serverId)),
})

export default connect(mapState, mapDispatch)(Channels);