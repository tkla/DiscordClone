import React from 'react'
import { Link } from 'react-router-dom';

export default class Servers extends React.Component {

   constructor(props){
      super(props);
      this.loadChannels = this.loadChannels.bind(this);
   }

   componentDidMount(){
      this.props.getUserServers();
   }

   loadChannels(serverId){
      this.props.getChannelsIndex(serverId);
   }

   render(){
      if (Object.keys(this.props.servers).length === 0){
         return (
            <div id='server-container'>
               <p className='server-item' id='home-channel'>Me</p>
            </div>
         )
      }

      let servers = this.props.servers;
      let currentUserId = this.props.currentUserId;
      let users = this.props.users;

      return(
         <div id='server-container'>
            <Link className='server-item' id='home-channel' to='/channels/@me'>Me</Link>

            <ul id='server-list'>
            {
               users[currentUserId].allServers.map( s =>
                  <li  key={s}>
                     <Link 
                        className='server-item' 
                        to={`/channels/${servers[s].id.toString().padStart(10, "0")}`}
                        onClick={ () => this.loadChannels(servers[s].id) }
                        > 
                        {servers[s].name}
                     </Link>
                  </li>
               )
            }
               <p className='server-item' id='add-server'>+</p>
               <p className='server-item' id='explore-server'>Explore</p>
            </ul>

            <p className='server-item' id='download-apps'>Download</p>
         </div>
      )
   }
}