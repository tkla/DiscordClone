import Posts from './posts'
import {connect} from 'react-redux'
import { receivePost, getPostsIndex, getPostCreate, getPostDestroy, getPostEdit } from '../../actions/post_actions'
const mapState = (state) => ({
   posts: state.entities.posts,
   channels: state.entities.channels,
   servers: state.entities.servers,
   users: state.entities.users,
   currentUser: state.entities.users[state.session.currentUserId]
})

const mapDispatch = (dispatch) => ({
   getPostsIndex: channelId => dispatch(getPostsIndex(channelId)),
   getPostCreate: formpost => dispatch(getPostCreate(formpost)),
   getPostDestroy: id => dispatch(getPostDestroy(id)),
   getPostEdit: (id, postForm) => dispatch(getPostEdit(id, postForm)),
   receivePost: post => dispatch(receivePost(post)),
})

export default connect(mapState, mapDispatch)(Posts);