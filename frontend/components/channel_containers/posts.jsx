import React from 'react'


export default class Posts extends React.Component{
   constructor(props){
      super(props)
      this.serverId = parseInt(this.props.match.params.id.substring(0,10));
      
      this.state ={
         server_id: this.serverId,
         channel_id: null,
         parent_id: null,
         body: '',
      }

      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit(e) {
      e.preventDefault();
      this.serverId = parseInt(this.props.match.params.id.substring(0,10));
   }

   render(){
      let posts = this.props.posts; 
      return(
         <div id='posts-container'>

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
            
            }</ul>

            <form onSubmit={this.handleSubmit}>
               <input id='post-input' type='text' />
            </form>
         </div>
      )
   }
}