import * as postAPI  
   from "../util/server_api_util";

export const RECEIVE_POST = 'RECEIVE_POST'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const CREATE_POST = 'CREATE_POST'
export const DELETE_POST = 'DELETE_POST'

const receivePost = post => ({
   type: RECEIVE_POST,
   post
})

const receivePosts = posts => ({
   type: RECEIVE_POSTS,
   posts
})

const createPost = post => ({
   type: CREATE_POST,
   post
})

const deletePost = post => ({
   type: DELETE_POST,
   post
})

export const getPostShow = id => dispatch => (
   postAPI.postShow(id)
      .then( post => dispatch(receivePost(post)))
)

export const getPostsIndex = channelId => dispatch => (
   postAPI.postsIndex(channelId)
      .then( posts => dispatch(receivePosts(posts)))
)

export const getPostCreate = formpost => dispatch => (
   postAPI.postCreate(formpost)
      .then( post => dispatch(createPost(post)))
)

export const getPostDestroy = id => dispatch => (
   postAPI.postDestroy(id)
      .then( post => dispatch(deletePost(post)))
)