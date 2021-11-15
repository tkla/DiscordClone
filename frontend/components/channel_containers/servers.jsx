import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';
export default class Servers extends React.Component {

   constructor(props) {
      super(props);
      this.serverId;
      this.currentUser = this.props.currentUser;
   }

   componentDidMount() {
      this.props.getUserServers();
      this.serverId = parseInt(this.props.match.params.id.substring(0, 10));
   }

   componentDidUpdate() {
      if (this.props.match.params.id !== "@me") {
         // Grab server id from params
         this.serverId = parseInt(this.props.match.params.id.substring(0, 10));

         // If server is not in state, dispatch ajax request
         if (!this.currentUser.allServers.includes(this.serverId)) {
            this.props.getServerShow(this.serverId);
            this.props.openJoinServer();
         }
      }
   }

   render() {
      let servers = this.props.servers;
      this.currentUser = this.props.currentUser;

      return (
         <div id='server-container'>
            <Modal serverId={this.serverId} />
            <Link className='server-item' id='home-channel' to='/channels/@me'
               current={(this.props.match.url === "/channels/@me").toString()}>
               <i className="fab fa-discord"></i>
            </Link>

            <ul id='server-list'>{
               Object.keys(servers).map(s =>
                  <li key={s}>
                     {(this.currentUser.allServers.includes(parseInt(s))) ?
                        <Link
                           current={(parseInt(this.props.match.params.id) === servers[s].id).toString()}
                           id={servers[s].avatar? 'server-item-avatar' : null}
                           className='server-item'
                           onClick={() => this.props.getUsersIndex(s)}
                           to={`/channels/${s.padStart(10, "0")}`}>
                           {servers[s].avatar ? <img className='profile-picture' id='display-profile' src={servers[s].avatar} alt={servers[s].avatar}/> 
                              : servers[s].name[0]}
                        </Link>
                        : null
                     }
                  </li>
               )}

               <a className='server-item' id='create-server' onClick={this.props.openCreateServer}>
                  <i className="fas fa-plus"></i>
               </a>
            </ul>

            <a className='server-item' href='https://github.com/tkla/DiscordClone' id='download-apps'>
               <i className="fab fa-github"></i>
            </a>
            <Link className='server-item' to='/' onClick={this.props.logout}>
               <i className="fas fa-sign-out-alt"></i>
            </Link>

            <a className='server-item' id='user-settings' onClick={this.props.openUserSettings}>
               <i className="fas fa-cog"></i>
            </a>
         </div>
      )
   }
}