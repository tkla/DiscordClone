import React from 'react'
import { Link } from 'react-router-dom';
import Modal from '../modals/modal';
export default class Servers extends React.Component {

   constructor(props) {
      super(props);
      this.serverId;
      this.currentUser = this.props.currentUser;
      this.inviteServer = false;
   }

   componentDidMount() {
      this.props.getUserServers();
      this.serverId = parseInt(this.props.match.params.id);
      if (this.props.match.params.invite) this.inviteServer = true;
   }

   // We check if we need to invite user to server 2 ways,
   // 1. When directly routing to the server via an invite url in browser search bar, componentDidMount will trigger and update this.inviteServer flag
   // 2. When clicking on server on the discover page user is routed to an invite url.
   componentDidUpdate(prevProps) {
      // if (this.props.match.params.id === '@me') this.props.getUserShow();
      if (this.props.match.params.id !== "@me") {
         
         // Grab server id from params
         this.serverId = parseInt(this.props.match.params.id);
         
         // Get server into state if not present.
         if (!this.props.servers[this.serverId]) this.props.getServerShow(this.serverId); 
         // Do nothing if user is already member
         if (this.props.currentUser.allServers.includes(this.serverId)) return;
         // If the previous url and this url are different, assume user was redirected to this page from elsewhere.
         // Update invite flag to true to enable further checks if we need to invite user.
         if (prevProps.match.url !== this.props.match.url) this.inviteServer = true;
         // Open join server modal if invite url param is present and join modal is not already open.
         if (this.props.match.params.invite && !this.props.modal && this.inviteServer) {
            this.props.getServerShow(this.serverId);
            this.props.openJoinServer();
            this.inviteServer = false;
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
                           to={`/channels/${s}`}>
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

            <a className='server-item' href='https://github.com/tkla' id='download-apps' target="_blank" rel="noopener noreferrer">
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