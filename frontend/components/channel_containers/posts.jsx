import React from 'react'


export default class Posts extends React.Component{
   constructor(props){
      super(props)
      this.serverId = parseInt(this.props.match.params.id.substring(0,10));
      
      //Author id will be set by rails backend
      this.state ={
         server_id: this.serverId,
         channel_id: null,
         parent_id: null,
         body: '',
      }
      
      this.channel_id = null;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
   }

   handleSubmit(e) {
      e.preventDefault();
      this.serverId = parseInt(this.props.match.params.id.substring(0,10));
      this.props.getPostCreate(this.state);
      
      this.setState({
         server_id: this.serverId,
         channel_id: null,
         parent_id: null,
         body: '',
      })
   }

   handleInput(input){
      return (e) => {
         this.setState({
            [input] : e.currentTarget.value,
            channel_id: this.channel_id
         })
      }
   }

   render(){
      let posts;
      if (this.props.posts.byId){
         posts = this.props.posts.byId; 
      } else {
         // Just an empty object, the view will render nothing with this.
         posts = this.props.posts;
      }
      this.channel_id = this.props.posts.currentChannelId;

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
               <input id='post-input' type='text' value={this.state.body} onChange={this.handleInput('body')}/>
            </form>
         </div>
      )
   }
}