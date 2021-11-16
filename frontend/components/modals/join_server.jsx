import {connect} from 'react-redux';
import React from 'react'
import { closeModal } from '../../actions/modal_actions';
import { getServerJoin, getUserServers, removeServerLocalState } from '../../actions/server_actions';
import { withRouter } from "react-router";

class JoinServer extends React.Component {
   constructor(props){
      super(props)
      this.serverId = this.props.serverId;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.history = this.props.history;
   }

   // Todo error handling for failed join.
   handleSubmit(e) {
      e.preventDefault();
      this.props.getServerJoin(this.serverId).then(() =>{
         // if (this.props.currentUser.allServers.includes(this.serverId))
         this.props.closeModal();
      });
   }

   componentWillUnmount() {
      this.history.push(`/channels/${this.serverId}`);
   }

   render(){ 
      if (!this.props.servers[this.serverId]){
         return (
            <div>
            </div>
         )
      }
      let server = this.props.servers[this.serverId];
      let avatar = <div className='avatar' id='avatar-placeholder'>{server.name[0]}</div>;
      if (server.avatar) avatar = <img
         className='profile-picture'
         id='display-profile'
         src={server.avatar}
         alt={server.avatar}
      />

      return (
         <div className='base-modal'>
            { <h1>{this.props.servers[this.serverId].name}</h1> }
            <i className="fas fa-times" id='exit' onClick={this.props.closeModal}></i>
            {avatar}
            <p className='gray-text'>{server.description}</p>
            <form className='registerForm' onSubmit={this.handleSubmit}>
               <input type='submit' value='Join'/>
            </form>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId],
   servers: state.entities.servers
})

const mapDispatchToProps = dispatch => ({
   getServerJoin: serverId => dispatch(getServerJoin(serverId)),
   getUserServers: () => dispatch(getUserServers()),
   removeServerLocalState: (serverId) => dispatch(removeServerLocalState(serverId)), 
   closeModal: () => dispatch(closeModal),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JoinServer));