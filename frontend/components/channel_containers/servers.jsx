import React from 'react'
import { Link } from 'react-router-dom';

export default class Servers extends React.Component {

   constructor(props){
      super(props);
   }

   componentDidMount(){
      this.props.getUserServers();
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
      let currentUser = this.props.currentUser;

      return(
         <div id='server-container'>
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