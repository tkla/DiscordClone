import CreateServer from "../components/modals/create_server";
import { userServers, serversIndex, serverCreate, serverShow, serverDestroy, serverJoin, serverLeave } 
   from "../util/server_api_util";

export const RECEIVE_SERVERS = 'RECEIVE_SERVERS';
export const RECEIVE_SERVER = 'RECEIVE_SERVER';
export const DESTROY_SERVER = 'DESTROY_SERVER';
export const CREATE_SERVER = 'CREATE_SERVER';

const receiveServers = (servers) => ({
   type: RECEIVE_SERVERS,
   servers
})

const receiveServer = (server) => ({
   type: RECEIVE_SERVER,
   server
})

const createServer = (server) => ({
   type: CREATE_SERVER,
   server
})

const destroyServer = (server) => ({
   type: DESTROY_SERVER,
   server 
})

// const receiveErrors = (errors) => ({
//    type: RECEIVE_SESSION_ERRORS,
//    errors
// })

// Get all the current user's servers
export const getUserServers = () => dispatch => (
   userServers()
      .then( servers => dispatch(receiveServers(servers)))
)

// Get all servers
export const getServersIndex = () => dispatch => (
   serversIndex()
      .then( servers => dispatch(receiveServers(servers)))
)

// Create server
export const getServerCreate = (formServer) => dispatch => (
   serverCreate(formServer)
      .then( server => dispatch(createServer(server)))
)

// Get a server
export const getServerShow = (id) => dispatch => (
   serverShow(id)
      .then( server => dispatch(receiveServer(server)))
)

// Delete a server
export const getServerDestroy = (id) => dispatch => (
   serverDestroy(id)
      .then( server => dispatch(destroyServer(server)))
)

// Join server
export const getServerJoin = (id) => dispatch => (
   serverJoin(id)
      .then( server => dispatch(createServer(server)))
)

// Leave server.
export const getServerLeave = (id) => dispatch => (
   serverLeave(id)
      .then( server => dispatch(destroyServer(server)))
)