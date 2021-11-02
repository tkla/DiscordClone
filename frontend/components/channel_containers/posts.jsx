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

   componentDidUpdate(){
      var element = document.getElementById("offset");
      element.scrollTop = element.scrollHeight;
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
         <div id='posts-component'>
            <div id='offset'>
               <ul className='posts-container'>{
                  Object.keys(posts).map( id => 
                     
                        <li className='post' key={id}>
                           <div className='post-avatar'><i className="fab fa-discord"></i></div>

                           <div className='post-content'>

                              <div className='post-reply'>{(posts[id].parent_id)? 
                                 <p className='username'>
                                    <i className="fas fa-reply"></i>
                                    {posts[posts[id].parent_id].username}
                                    <span>{posts[posts[id].parent_id].body}</span>
                                 </p>
                              : ''}</div>

                              <p className='username'>{posts[id].username} <span className='time'>{ posts[id].created_at}</span></p>

                              <p className='post-body'>{posts[id].body}</p>

                           </div> 
                           
                        </li>
                     
                  )
               
               }</ul>
            </div>
            
            <form onSubmit={this.handleSubmit}>
               <input 
                  id='post-input' 
                  type='text' 
                  value={this.state.body} 
                  autoComplete="off" 
                  onChange={this.handleInput('body')}
               />
            </form>
         </div>
      )
   }
}