import { RECEIVE_SERVERS, RECEIVE_SERVER, DESTROY_SERVER, CREATE_SERVER } 
   from "../actions/server_actions";

const serversReducer = (state = {}, action) => {
   Object.freeze(state);
   const newState = Object.assign({}, state);

   switch (action.type){
      case RECEIVE_SERVERS: 
         return action.servers;
      
      case RECEIVE_SERVER:
         newState[action.server.id] = action.server;
         return newState;

      case DESTROY_SERVER: 
         delete newState[action.server.id];
         return newState;

      // This action type will hit users reducer as well to update their all_servers
      case CREATE_SERVER:
         newState[action.server.id] = action.server;
         return newState;
      default: 
         return state;
   }
}

export default serversReducer;