import Posts from './posts'
import {connect} from 'react-redux'

const mapState = (state) => ({
   posts: state.entities.comments
})

const mapDispatch = (dispatch) => ({
})

export default connect(mapState, mapDispatch)(Posts);