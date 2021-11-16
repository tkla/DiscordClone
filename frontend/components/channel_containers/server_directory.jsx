import React from 'react'


export default class ServerDirectory extends React.Component {

   componentDidMount() {
      this.props.getServersIndex();
   }

   // componentWillUnmount(){
   //    this.props.clearServers();
   //    this.props.getUserServers();
   // }

   // TODO seperate server profile picture into Server Icon and Server Banner.
   render() {
      let servers = Object.values(this.props.servers).map(server => (
         <div className='server-display-card'>
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