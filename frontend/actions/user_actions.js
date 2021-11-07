import { usersIndex, userShow, userEdit } 
   from "../util/server_api_util";

export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

const receiveUser = (user) => ({
   type: RECEIVE_USER,
   user 
})

const receiveUsers = (users) => ({
   type: RECEIVE_USERS,
   users
})

const receiveErrors = (errors) => ({
   type: RECEIVE_SESSION_ERRORS,
   errors
})

export const getUserShow = (id) => dispatch => (
   userShow(id).then( user => dispatch(receiveUser(user)))
)

export const getUsersIndex = (serverId) => dispatch => (
   usersIndex(serverId).then( users => dispatch(receiveUsers(users)))
)

export const getUserEdit = (userId, formUser) => dispatch => (
   userEdit(userId, formUser)
      .then( 
         user => dispatch(receiveUser(user),
         errors => dispatch(receiveErrors(errors))))
)
