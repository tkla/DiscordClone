import React from 'react'


export default class Posts extends React.Component {
   constructor(props) {
      super(props)
      this.serverId = parseInt(this.props.match.params.id.substring(0, 10));

      //Author id will be set by rails backend
      this.state = {
         server_id: this.serverId,
         channel_id: null,
         parent_id: null,
         author_id: this.props.currentUser.id,
         body: '',
      }
      this.channel_id = null;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
   }

   componentDidMount() {
      App.cable.subscriptions.create(
         { channel: "ChatChannel" },
         {
            received: data => {
               this.props.receivePost(data);
            },
            speak: function (data) {
               return this.perform("speak", data);
            }
         }
      );
   }

   componentDidUpdate() {
      var element = document.getElementById("offset");
      element.scrollTop = element.scrollHeight;
      if (this.state.author_id !== this.props.currentUser.id) this.setState({author_id: this.props.currentUser.id});
   }

   handleSubmit(e) {
      e.preventDefault();
      this.serverId = parseInt(this.props.match.params.id.substring(0, 10));
      App.cable.subscriptions.subscriptions[1].speak(this.state);
      this.setState({
         server_id: this.serverId,
         channel_id: null,
         parent_id: null,
         body: '',
      })
   }

   handleInput(input) {
      return (e) => {
         this.setState({
            [input]: e.currentTarget.value,
            channel_id: this.channel_id
         })
      }
   }

   render() {
      let posts;
      if (this.props.posts.byId) {
         posts = this.props.posts.byId;
      } else {
         // Just an empty object, the view will render nothing with this.
         posts = this.props.posts;
      }
      this.channel_id = this.props.posts.currentChannelId;
      let currentUser = this.props.currentUser;
      return (
         <div id='posts-component'>
            <div id='offset'>
               <ul className='posts-container'>{
                  Object.values(posts).map(p =>
                     <li className='post' key={p.id}>
                        {this.props.users[p.author_id] ? 
                           this.props.users[p.author_id].avatar ?
                              <div className='post-avatar'><img src={this.props.users[p.author_id].avatar}/></div>
                              :<div className='default-avatar'><i className="fab fa-discord"></i></div>
                           : null
                        }

                        <div className='post-content'>
                           <div className='post-reply'>{(p.parent_id) ?
                              <p className='username'>
                                 <i className="fas fa-reply"></i>
                                 {posts[p.parent_id].username}
                                 <span>{posts[p.parent_id].body}</span>
                              </p>
                              : ''}</div>
                           <p className='username'>{p.username} <span className='time'>{p.created_at}</span></p>
                           <p className='post-body'>{p.body}</p>
                        </div>

                        
                        {p.author_id === currentUser.id ? 
                           <div className='post-edit'>
                              <i id='post-update' className="fas fa-edit"></i>  
                              <i id='post-delete' className="far fa-trash-alt" onClick={()=>this.props.getPostDestroy(p.id)}></i>
                           </div>
                        :''}
                        
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