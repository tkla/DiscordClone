import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';
export default class Channel extends React.Component {

   constructor(props) {
      super(props)
      this.serverId = -1;
      this.firstChannelId = null;
      this.selectedChannel = 0;

      this.leaveServer = this.leaveServer.bind(this);
      this.loadPosts = this.loadPosts.bind(this);
      this.clickChannel = this.clickChannel.bind(this);

      this.toggle = this.toggle.bind(this);

      this.state = {
         hideText: false,
         hideVoice: false
      }
   }

   toggle(bool) {
      this.setState({
         [bool]: !this.state[bool]
      })
   }

   componentDidMount() {
      this.serverId = parseInt(this.props.match.params.id.substring(0, 10));
      this.props.getChannelsIndex(this.serverId);
   }

   // On URL change check if we need to query for new channels into store.
   componentDidUpdate() {
      let newId = parseInt(this.props.match.params.id.substring(0, 10));
      if (this.serverId != newId) {
         this.serverId = newId;
         this.props.getChannelsIndex(this.serverId);
         this.setState({
            hideText: false,
            hideVoice: false
         })
      }
   }

   loadPosts(channelId) {
      this.props.getPostsIndex(channelId);
   }

   leaveServer() {
      this.props.getUserServers();
      this.props.getServerLeave(this.serverId)
   }

   clickChannel(e, id) {
      this.selectedChannel = id;
      if (this.props.channels[id].voice_channel) {
         // todo
      } else {
         this.loadPosts(id);
      }
   }

   render() {
      let channels = this.props.channels;
      let server = this.props.servers[this.serverId];

      if (!server || !channels) {
         return (
            <div>
               <div className='channel-container' id='channels-list'> </div>
            </div>
         )
      }

      // Grab the posts from the first channel in the server. Don't grab posts again on rerender if we aren't changing servers.
      Object.keys(channels).some(id => {
         if (this.firstChannelId != id) {
            this.firstChannelId = id;
            this.selectedChannel = this.firstChannelId;
            this.props.getPostsIndex(id);
         }
         return true;
      })

      let isAuthor;
      (this.props.currentUser.id === server.author_id) ? isAuthor = true : isAuthor = false;

      return (
         <div>
            <Modal serverId={this.serverId} />

            <div className='channel-container' id='channels-list'>
               <h1 className='server-name-header'>{server.name} <span className='server-edit'><i className="fas fa-edit"></i></span></h1>

               <Link to='/channels/@me' onClick={this.leaveServer} hidden={isAuthor}>Leave Server</Link>

               <div className='collapse' id='channels'>
                  <div id='channel-header' onClick={(e) => this.toggle('hideText')}>
                     <h2>Text Channels</h2>
                     <button id='create-channel' onClick={() => this.props.openNewChannel()} hidden={!isAuthor}>
                        <i className="fas fa-plus"></i>
                     </button>
                  </div>

                  <ul className='channels-list' hidden={this.state.hideText}>{

                     Object.keys(channels).map(channelId => (channels[channelId].voice_channel ? null :
                        <li key={channels[channelId].name} onClick={(e) => this.clickChannel(e, channelId)}>

                           <input id={channelId} type='radio' name='channel-item' defaultChecked={this.selectedChannel === channelId} />
                           <label htmlFor={channelId}>
                              {channels[channelId].name}
                              {isAuthor ?
                                 <button className='destroy' onClick={() => this.props.getChannelDestroy(channelId)}>
                                    <i className="fas fa-trash"></i>
                                 </button>
                                 : null}
                           </label>

                        </li>
                     ))

                  }</ul>
               </div>

               <div className='collapse' id='channels'>

                  <div id='channel-header' onClick={() => this.toggle('hideVoice')}>
                     <h2>Voice Channels</h2>
                     <button id='create-channel' onClick={() => this.props.openNewChannel()} hidden={!isAuthor}>
                        <i className="fas fa-plus"></i>
                     </button>
                  </div>

                  <ul className='channels-list' hidden={this.state.hideVoice}>{

                     Object.keys(channels).map(channelId => (!channels[channelId].voice_channel ? null :
                        <li key={channels[channelId].name} onClick={(e) => this.clickChannel(e, channelId)}>
                           <input id={channelId} type='radio' name='channel-item' />
                           <label htmlFor={channelId}>
                              {channels[channelId].name}
                              {isAuthor ?
                                 <button className='destroy' onClick={() => this.props.getChannelDestroy(channelId)}>
                                    <i className="fas fa-trash"></i>
                                 </button>
                                 : null}
                           </label>
                        </li>
                     ))

                  }</ul>
               </div>
               
            </div>
         </div>
      )
   }
}