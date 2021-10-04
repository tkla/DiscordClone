import { RECEIVE_CURRENT_USER } from "../actions/session_actions";
import { CREATE_SERVER } from "../actions/server_actions";

const usersReducer = (state = {}, action) =>{
   Object.freeze(state); 
   const newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_CURRENT_USER:
         return newState[action.user.id] = action.user;
      
      case CREATE_SERVER:
         let currentUserId = action.server.allUsers[0];
         newState[currentUserId].allServers.push(action.server.id)
         return state;
         
      default:
         return state;
   }
}

export default usersReducer;