import { usersIndex, userShow } 
   from "../util/server_api_util";

export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'

const receiveUser = (user) => ({
   type: RECEIVE_USER,
   user 
})

const receiveUsers = (users) => ({
   type: RECEIVE_USERS,
   users
})

export const getUserShow = (id) => dispatch => (
   userShow(id)
      .then( user => dispatch(receiveUser(user)))
)

export const getUsersIndex = (serverId) => dispatch => (
   usersIndex(serverId)
      .then( users => dispatch(receiveUsers(users)))
)

