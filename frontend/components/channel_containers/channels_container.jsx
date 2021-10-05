import Channels from './channels'
import {connect} from 'react-redux'

const mapState = (state) => ({
   channels: state.entities.channels,
   servers: state.entities.servers
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Channels);