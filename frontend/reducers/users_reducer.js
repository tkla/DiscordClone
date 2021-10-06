import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { CREATE_SERVER, DESTROY_SERVER } from "../actions/server_actions";
import { RECEIVE_USER, RECEIVE_USERS } from '../actions/user_actions';

// const DEFAULT_STATE = {
//    1: {

//    }
// }
const usersReducer = (state = {}, action) =>{
   Object.freeze(state); 
   const newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_CURRENT_USER:
         newState[action.user.id] = action.user;
         return newState;
      
      case RECEIVE_USER: 
         newState[action.user.id] = action.user;
         return newState;

      case RECEIVE_USERS: 
         return Object.assign({}, newState, action.users);

      case CREATE_SERVER:
         let currentUserId = action.server.allUsers[0];
         newState[currentUserId].allServers.push(action.server.id)
         return newState;

      // case DESTROY_SERVER:
      //    currentUserId = action.server.allUsers[0];
      //    console.log(currentUserId);
      //    console.log(newState);
      //    newState[currentUserId].allServers.push(action.server.id)
      //    return newState;
         
      default:
         return state;
   }
}

export default usersReducer;