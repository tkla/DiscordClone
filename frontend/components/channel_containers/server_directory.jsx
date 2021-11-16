import React from 'react'


export default class ServerDirectory extends React.Component {

   constructor(props){
      super(props)

      this.navigateToServer = this.navigateToServer.bind(this);
   }

   componentDidMount() {
      this.props.getServersIndex();
   }

   // componentWillUnmount(){
   //    this.props.clearServers();
   //    this.props.getUserServers();
   // }


   navigateToServer(serverId, inviteUrl){
      if (this.props.currentUser.allServers.includes(serverId)){ // Navigate to normal non-invite server url if user is member.
         this.props.history.push(`/channels/${serverId}`);
      } else {
         this.props.history.push(`/channels/${serverId}/${inviteUrl}`); // Otherwise navigate to server invite url.
      }
      
   }

   // TODO seperate server profile picture into Server Icon and Server Banner.
   render() {
      let servers = Object.values(this.props.servers).map(server => (
         <div className='server-display-card' key={server.id} onClick={()=> this.navigateToServer(server.id, server.invite_url)} >
            <div className='server-banner'>
               {server.avatar ?
                  <img
                     className='server-banner-avatar'
                     src={server.avatar}
                     alt={server.avatar}
                  />
                  :
                  <i id='server-banner-default' className="fab fa-discord"></i>  
               }
            </div>
            <div className='server-display-details'>
               {/* Todo add server icon here. */}
               <h2>{server.name}</h2>
               <p className='server-description'>{server.description}</p>
               <p className='server-member-count'>{server.allUsers.length} Members</p>
            </div>
         </div>
      ))

      return (
         <div className='server-directory'>
            <h1>Discover</h1>
            <div className='server-display'>
               {servers}
            </div>

         </div>
      )
   }
}