import Friends from './friends'
import {connect} from 'react-redux'

const mapState = (state) => ({
   servers: state.entities.servers,
   users: state.entities.users,
   currentUserId: state.session.currentUserId
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Friends);