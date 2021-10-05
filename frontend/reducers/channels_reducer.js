import { RECEIVE_CHANNEL, RECEIVE_CHANNELS, CREATE_CHANNEL, DELETE_CHANNEL }
   from '../actions/channel_actions'

const channelsReducer = (state = {}, action) => {
   Object.freeze(state); 
   const newState = Object.assign({}, state);

   switch (action.type) {
      case RECEIVE_CHANNEL:
         // = action.channel;
         return { [action.channel.id]: action.channel}; 

      case RECEIVE_CHANNELS: 
         return action.channels

      case CREATE_CHANNEL: 
         newState[action.channel.id] = action.channel; 
         return newState; 

      case DELETE_CHANNEL:
         delete newState[action.channel.id];
         return newState 
         
      default:
         return state;
   }
}

export default channelsReducer;
