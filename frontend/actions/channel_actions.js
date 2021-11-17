import { channelsIndex, channelShow, channelCreate, channelDestroy } 
   from "../util/server_api_util";
import { receiveErrors } from "./session_actions";
export const RECEIVE_CHANNEL = 'RECEIVE_CHANNEL'
export const RECEIVE_CHANNELS = 'RECEIVE_CHANNELS'
export const CREATE_CHANNEL = 'CREATE_CHANNEL'
export const DELETE_CHANNEL = 'DELETE_CHANNEL'

const receiveChannel = channel => ({
   type: RECEIVE_CHANNEL,
   channel
})

const receiveChannels = channels => ({
   type: RECEIVE_CHANNELS,
   channels
})

const createChannel = (channel) => ({
   type: CREATE_CHANNEL,
   channel
})

const deleteChannel = channel => ({
   type: DELETE_CHANNEL,
   channel
})

export const getChannelShow = (id) => dispatch => (
   channelShow(id)
      .then( channel => dispatch(receiveChannel(channel)))
)

export const getChannelsIndex = serverId => dispatch => (
   channelsIndex(serverId)
      .then( channels => dispatch(receiveChannels(channels)))
)

export const getChannelCreate = formChannel => dispatch => (
   channelCreate(formChannel).then( 
      channel => dispatch(createChannel(channel)),
      errors => dispatch(receiveErrors(errors))
   )
)

export const getChannelDestroy = id => dispatch => (
   channelDestroy(id)
      .then( channel => dispatch(deleteChannel(channel)))
)