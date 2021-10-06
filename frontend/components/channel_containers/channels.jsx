import React from 'react'
import { Link } from 'react-router-dom';

export default class Channel extends React.Component{

   constructor(props){
      super(props)
      this.serverId = -1;
      this.leaveServer = this.leaveServer.bind(this);
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

   leaveServer(){
      this.props.getUserServers();
      this.props.getServerLeave(this.serverId)
   }

   render(){
      let channels = this.props.channels;
      let server = this.props.servers[this.serverId];

      if (!server || !channels){
         return (
            <div> 
               <div className='channel-container' id='channels-list'>
               </div>
            </div>
         )
      }
      let isAuthor;
      (this.props.currentUser.id === server.author_id)?  isAuthor = true :  isAuthor = false; 

      return(
         <div> 
            <div className='channel-container' id='channels-list'>
               <h3 className='channel-header'>{server.name}</h3>

               <Link to='/channels/@me' onClick={this.leaveServer} hidden={isAuthor}>Leave Server</Link>

               <div className='collapse' id='text-channels'>
                  <ul className='text-channels-list'>{ 
                     Object.keys(channels).map( channelId=>  
                        <li key={channels[channelId].name}>
                           {channels[channelId].name}
                        </li>
                     )
                  }</ul>
               </div>

            </div>
         </div>
      )
   }
}