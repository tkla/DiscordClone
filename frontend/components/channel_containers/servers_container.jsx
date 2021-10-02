import Servers from './servers'
import {connect} from 'react-redux'
import { getUserServers } from '../../actions/server_actions'

const mapState = (state) => ({
   servers: state.entities.servers
})

const mapDispatch = (dispatch) => ({
   getUserServers: () => dispatch(getUserServers())
})

export default connect(mapState, mapDispatch)(Servers);