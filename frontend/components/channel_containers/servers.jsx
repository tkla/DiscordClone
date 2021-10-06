import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';
export default class Servers extends React.Component {

   constructor(props){
      super(props);
      this.serverId;
   }

   componentDidMount(){
      this.props.getUserServers();
      this.serverId = parseInt(this.props.match.params.id.substring(0,10)); 
   }

   componentDidUpdate(){
      if (this.props.match.params.id !== "@me") {
         console.log("Updating")
         this.serverId = parseInt(this.props.match.params.id.substring(0,10)); 
         if (!this.props.servers[this.serverId]){
            this.props.getServerShow(this.serverId);
            this.props.openJoinServer();
         }
      }
   }

   render(){
      if (Object.keys(this.props.servers).length === 0){
         return (
            <div id='server-container'>
               <p className='server-item' id='home-channel'>Me</p>
            </div>
         )
      }
      //let serverId = parseInt(this.props.match.params.id.substring(0,10)); 
      let servers = this.props.servers;
      let currentUser = this.props.currentUser;


      return(
         <div id='server-container'>
            <Modal serverId={this.serverId}/>
            <Link className='server-item' id='home-channel' to='/channels/@me'>Me</Link>

            <ul id='server-list'>
            {
               currentUser.allServers.map( s =>
                  <li  key={s}>
                     <Link 
                        className='server-item' 
                        to={`/channels/${servers[s].id.toString().padStart(10, "0")}`}> 
                        {servers[s].name}
                     </Link>
                  </li>
               )
            }
               <a className='server-item' id='create-server' onClick={this.props.openCreateServer}>+</a>
               <p className='server-item' id='explore-server'>Explore</p>
            </ul>
            
            <a className='server-item' href='https://github.com/tkla/DiscordClone' id='download-apps'>G</a>
         </div>
      )
   }
}