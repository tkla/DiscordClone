import { RECEIVE_SERVERS, RECEIVE_SERVER, DESTROY_SERVER, CREATE_SERVER } 
   from "../actions/server_actions";

const DEFAULT_STATE = {
   byId: {},
   allIds: []
}

const serversReducer = (state = DEFAULT_STATE, action) => {
   Object.freeze(state);
   const newState = Object.assign({}, state);

   switch (action.type){
      case RECEIVE_SERVERS: 
         newState.byId = action.servers; 
         newState.allIds = [];
         for(var id in newState.byId){
            newState.allIds.push(parseInt(id));
         }
         return newState;
      
      case RECEIVE_SERVER:
         if (!newState.byId[action.server.id]){
            newState.allIds.push(action.server.id);
         } 
         newState.byId[action.server.id] = action.server;
         return newState;

      case DESTROY_SERVER: 
         delete newState.byId[action.server.id];
         return newState;

      // This action type will hit users reducer as well to update their all_servers
      case CREATE_SERVER:
         newState.byId[action.server.id] = action.server;
         return newState;
      default: 
         return state;
   }
}

export default serversReducer;