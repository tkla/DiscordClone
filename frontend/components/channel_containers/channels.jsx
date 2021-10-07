import React from 'react'
import { Link } from 'react-router-dom';

export default class Channel extends React.Component{

   constructor(props){
      super(props)
      this.serverId = -1;
      this.firstChannelId = null;

      this.leaveServer = this.leaveServer.bind(this);
      this.loadPosts = this.loadPosts.bind(this);
      this.clickChannel = this.clickChannel.bind(this);
   }
   
   componentDidMount(){
      this.serverId = parseInt(this.props.match.params.id.substring(0,10)); 
      this.props.getChannelsIndex(this.serverId);
   }

   // On URL change check if we need to query for new channels into store.
   componentDidUpdate(){
      let newId =  parseInt(this.props.match.params.id.substring(0,10));
      if (this.serverId != newId) {
         this.serverId = newId;
         this.props.getChannelsIndex(this.serverId);
      }
   }

   loadPosts(channelId) {
      this.props.getPostsIndex(channelId);
   }

   leaveServer(){
      this.props.getUserServers();
      this.props.getServerLeave(this.serverId)
   }

   clickChannel(e, id){
      //e.currentTarget.className="channel-selected"
      if (this.props.channels[id].voice_channel){
         // todo
      }else {
         this.loadPosts(id);
      }
   }

   render(){
      let channels = this.props.channels;
      let server = this.props.servers[this.serverId];

      if (!server || !channels){
         return (
            <div> 
               <div className='channel-container' id='channels-list'> </div>
            </div>
         )
      }

      // Grab the posts from the first channel in the server. Don't grab posts again on rerender if we aren't changing servers.
      Object.keys(channels).some( id =>{
         if (this.firstChannelId != id){
            this.firstChannelId = id;
            this.props.getPostsIndex(id);
         } 
         return true;
      })
      
      
      let isAuthor;
      (this.props.currentUser.id === server.author_id)?  isAuthor = true :  isAuthor = false; 

      return(
         <div> 
            <div className='channel-container' id='channels-list'>
               <h1 className='channel-header'>{server.name}</h1>

               <Link to='/channels/@me' onClick={this.leaveServer} hidden={isAuthor}>Leave Server</Link>

               <div className='collapse' id='text-channels'>
                  <h2>Text Channels</h2>
                  <ul className='text-channels-list'>{ 
                     Object.keys(channels).map( channelId=>  
               
                        <li key={channels[channelId].name} onClick={(e)=>this.clickChannel(e, channelId)}>
                           <input id={channelId} type='radio' name='channel-item' />
                           <label htmlFor={channelId}>{channels[channelId].name}</label>
                        </li>
                        
                     )
                  }</ul>
               </div>

            </div>
         </div>
      )
   }
}