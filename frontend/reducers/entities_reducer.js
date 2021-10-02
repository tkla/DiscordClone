import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import serversReducer from "./servers_reducer";
const entitiesReducer = combineReducers({
   servers: serversReducer,
   users: usersReducer,
})

export default entitiesReducer;