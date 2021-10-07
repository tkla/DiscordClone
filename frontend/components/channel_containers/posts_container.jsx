import Posts from './posts'
import {connect} from 'react-redux'
import { getPostShow, getPostsIndex, getPostCreate, getPostDestroy } from '../../actions/post_actions'
const mapState = (state) => ({
   posts: state.entities.posts,
   currentUser: state.entities.users[state.session.currentUserId]
})

const mapDispatch = (dispatch) => ({
   getPostsIndex: channelId => dispatch(getPostsIndex(channelId)),
   getPostCreate: formpost => dispatch(getPostCreate(formpost)),
   getPostDestroy: id => dispatch(getPostDestroy(id)),
})

export default connect(mapState, mapDispatch)(Posts);