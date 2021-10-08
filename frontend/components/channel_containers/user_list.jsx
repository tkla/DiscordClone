import React from 'react'


export default class UserList extends React.Component{

   componentDidMount(){
      // this.props.getUsersIndex();
   }
   render(){
      // let users = this.props.users;
      return(
         <div id='user-list-container'>
            <h3>User list</h3>
{/*             
            <ul>{
               Object.keys(posts).map( id => 
                  <li className='post-container' key={id}>
                     <div id='post-avatar'>Avatar</div>

                     <div id='post-content'>

                        <p id='post-reply'>{(posts[id].parent_id)? 'reply: '+posts[posts[id].parent_id].body : ''}</p>

                        <h4>{posts[id].username} <span>{ posts[id].created_at}</span></h4>

                        <p id='post-body'>{posts[id].body}</p>

                     </div> 
                     
                  </li>
               )
            
            }</ul> */}

         </div>
      )
   }
}