import Channels from './channels'
import {connect} from 'react-redux'

const mapState = (state) => ({
   channels: state.entities.channels
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Channels);