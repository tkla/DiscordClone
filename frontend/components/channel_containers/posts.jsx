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
      this.handleEdit = this.handleEdit.bind(this);
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
      if (!this.state.body.trim()) return;
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

   handleEdit(id){
      let post = document.getElementById('post-' + id);
      let originalText = post.innerHTML;
      post.contentEditable = true;
      post.style.background = '#40444B';
      post.focus();
      let helper = document.getElementById('helper-'+id);
      helper.style.display = 'block';

      post.addEventListener('keydown', e => {
         switch(e.key) {
            case 'Escape':
               post.innerHTML = originalText;
               post.blur();
               post.style.background = 'none';
               post.contentEditable = false;
               helper.style.display = 'none';
               return;
            case 'Enter': 
               post.blur();
               post.style.background = 'none';
               post.contentEditable = false;
               const editState = Object.assign({}, this.state);
               editState.body = post.innerHTML;
               editState.channel_id = this.channel_id;
               this.props.getPostEdit(id, editState); // Todo Error handling
               helper.style.display = 'none';
               return;
            default: return 
         }
      })
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
                           <p id={'post-'+ p.id} className='post-body' contentEditable={false}>{p.body}</p>
                           <p id={'helper-'+p.id} className='show-edit-help'>Press <span id='edit-escape'>Escape</span>to cancel. <span id='edit-confirm'>Enter</span>to save.</p>
                        </div>

                        {p.author_id === currentUser.id ? 
                           <div className='post-edit'>
                              <i id='post-update' className="fas fa-edit" onClick={()=>this.handleEdit(p.id)}></i>  
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
                  onKeyDown={(e) =>{ if (e.key ==='Escape') e.currentTarget.blur()}}
                  onFocus={() => {
                     let helper = document.getElementById('submit-helper');
                     helper.style.display = 'block';
                  }}
                  onBlur={()=>{
                     let helper = document.getElementById('submit-helper');
                     helper.style.display = 'none';
                  }}
               />
               <p id='submit-helper' className='show-edit-help'>Press <span id='edit-escape'>Escape </span>to cancel. <span id='edit-confirm'>Enter </span>to save.</p>
            </form>
         </div>
      )
   }
}