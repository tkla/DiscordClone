import Debug from "./debug.jsx";
import {connect} from 'react-redux'
import {logout} from '../../actions/session_actions'

const mapState = (state) => ({
   currentUser: state.entities.users[state.session.id]
})

const mapDispatch = dispatch => ({
   logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Debug);