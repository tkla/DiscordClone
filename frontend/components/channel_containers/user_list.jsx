import React from 'react'


export default class UserList extends React.Component{

   componentDidMount(){
      this.props.getUsersIndex(parseInt(this.props.match.params.id));
   }

   render(){
      let users = this.props.users;
      return(
         <div id='user-list-container'>
            <h3>Members List</h3>
            
            <ul>{
               Object.keys(users).map( id => 
                  <li className='user-container' key={id}> 

                     <div id='post-content'>{(users[id].username==="Admin" || users[id].username === this.props.currentUser.username)? null: 
                        <p>
                           <div className='post-avatar'><i className="fab fa-discord"></i></div> 
                           { users[id].username } 
                        </p>
                        
                     }</div> 
                  
                  </li>
               )          
            }</ul>

         </div>
      )
   }
}