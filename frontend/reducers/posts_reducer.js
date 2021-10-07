import { RECEIVE_POST, RECEIVE_POSTS, CREATE_POST, DELETE_POST }
   from '../actions/post_actions'

const postsReducer = (state = {}, action) => {
   Object.freeze(state); 
   const newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_POST:
         newState[action.post.id] = action.post
         return newState;

      case RECEIVE_POSTS: 
         return action.posts

      case CREATE_POST: 
         newState[action.post.id] = action.post; 
         return newState; 

      case DELETE_POST:
         delete newState[action.post.id];
         return newState 
         
      default:
         return state;
   }
}

export default postsReducer;
