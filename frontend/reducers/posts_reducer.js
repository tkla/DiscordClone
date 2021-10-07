import { RECEIVE_POST, RECEIVE_POSTS, CREATE_POST, DELETE_POST }
   from '../actions/post_actions'

const postsReducer = (state = {}, action) => {
   Object.freeze(state); 
   const newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_POST:
         newState.byId[action.post.id] = action.post
         return newState;

      case RECEIVE_POSTS: 
         return action.posts
      
      // Leave this in case more functionality is needed in future.
      case CREATE_POST: 
         newState.byId[action.post.id] = action.post; 
         return newState; 

      case DELETE_POST:
         delete newState.byId[action.post.id];
         return newState 
         
      default:
         return state;
   }
}

export default postsReducer;
