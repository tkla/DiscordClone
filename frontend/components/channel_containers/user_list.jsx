import React from 'react'


export default class UserList extends React.Component{

   componentDidMount(){
      console.log(parseInt(this.props.match.params.id))
      this.props.getUsersIndex(parseInt(this.props.match.params.id));
   }

   render(){
      let users = this.props.users;
      let serverId = parseInt(this.props.match.params.id);
      let currentUser = null;

      if (this.props.currentUser.allServers.includes(serverId)){
         currentUser = (
            <div id='user-list-current-user'>
               {this.props.currentUser.avatar ?
                  <div className='post-avatar'><img src={this.props.currentUser.avatar}/></div>
                  :<div className='default-avatar'><i className="fab fa-discord"></i></div>
               }
               <p className='list-username'>{ this.props.currentUser.username } </p>
            </div> 
         )
      }

      return(
         <div id='user-list-container'>
            <h3>Members List</h3>
            
            <ul>
               <li className='members-list-item'> {currentUser} </li>
               {
               Object.keys(users).map( id => 
                  <li className='user-container' className='members-list-item' key={id}> 
                     <div id='server-users'>{(users[id].username==="Admin" || users[id].username === this.props.currentUser.username)? null: 
                        <div>
                           {users[id].avatar ?
                              <div className='post-avatar'><img src={users[id].avatar}/></div>
                              :<div className='default-avatar'><i className="fab fa-discord"></i></div>
                           }
                           <p className='list-username'>{ users[id].username } </p>
                        </div>
                     }</div> 
                  </li>
               )          
            }</ul>

         </div>
      )
   }
}