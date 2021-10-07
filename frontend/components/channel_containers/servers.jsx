import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';
export default class Servers extends React.Component {

   constructor(props){
      super(props);
      this.serverId;
      this.currentUser = this.props.currentUser;
   }

   componentDidMount(){
      this.props.getUserServers();
      this.serverId = parseInt(this.props.match.params.id.substring(0,10)); 
   }

   componentDidUpdate(){
      if (this.props.match.params.id !== "@me") {
         // Grab server id from params
         this.serverId = parseInt(this.props.match.params.id.substring(0,10)); 

         // If server is not in state, dispatch ajax request
         if (!this.props.servers[this.serverId]){
            this.props.getServerShow(this.serverId);
            this.props.openJoinServer();
         }

         // // If server is not in user's allServers open modal and server exists in state.
         // if (!this.currentUser.allServers.includes(this.serverId) && this.props.servers[this.serverId]){
         //    this.props.openJoinServer();
         // }
      }
   }

   render(){
      // if (Object.keys(this.props.servers).length === 0){
      //    return (
      //       <div id='server-container'>
      //          <p className='server-item' id='home-channel'>Me</p>
      //       </div>
      //    )
      // }
      let servers = this.props.servers;

      return(
         <div id='server-container'>
            <Modal serverId={this.serverId}/>
            <Link className='server-item' id='home-channel' to='/channels/@me'>Me</Link>

            <ul id='server-list'>
            {
               Object.keys(this.props.servers).map( s =>
                  <li  key={s}>
                     { (this.currentUser.allServers.includes(parseInt(s)))? 
                        <Link 
                           className='server-item' 
                           to={`/channels/${servers[s].id.toString().padStart(10, "0")}`}> 
                           {servers[s].name}
                        </Link>
                     : null
                     }
                  </li>
               )
            }
               <a className='server-item' id='create-server' onClick={this.props.openCreateServer}>+</a>
               <p className='server-item' id='explore-server'>Explore</p>
            </ul>
            
            <a className='server-item' href='https://github.com/tkla/DiscordClone' id='download-apps'>G</a>
            <Link className='server-item' to='/' onClick={this.props.logout}>Logout</Link>
         </div>
      )
   }
}