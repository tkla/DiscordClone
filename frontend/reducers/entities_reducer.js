import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import serversReducer from "./servers_reducer";
import channelsReducer from './channels_reducer'
import postsReducer from "./posts_reducer";

const entitiesReducer = combineReducers({
   servers: serversReducer,
   channels: channelsReducer,
   users: usersReducer,
   posts: postsReducer,
})

export default entitiesReducer;

