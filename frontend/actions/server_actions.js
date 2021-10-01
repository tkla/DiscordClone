import { userServers } from "../util/server_api_util";

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';

const receiveServers = (servers) => ({
   type: RECEIVE_SERVERS,
   servers
})

export const getUserServers = () => dispatch => {
   console.log("Yo");
   return userServers()
      .then( (servers) => dispatch(receiveServers(servers)))
}