import { RECEIVE_SERVERS } from "../actions/server_actions";

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
            newState.allIds.push(id);
         }
         return newState;

      default: 
         return state;
   }
}

export default serversReducer;