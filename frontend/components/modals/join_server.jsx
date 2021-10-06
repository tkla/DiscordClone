import {connect} from 'react-redux';
import React from 'react'
import { closeModal } from '../../actions/modal_actions';
import { getServerJoin, getUserServers, removeServerLocalState } from '../../actions/server_actions';
// import { Redirect } from 'react-router'

class JoinServer extends React.Component {
   constructor(props){
      super(props)
      this.serverId = this.props.serverId;
      this.handleSubmit = this.handleSubmit.bind(this);

      this.joined =  false; 
      // Rework later, temporary workaround.
      this.serverCount = this.props.currentUser.allServers.length;
   }

   
   handleSubmit(e) {
      e.preventDefault();
      this.joined = true;
      this.props.getServerJoin(this.serverId);
   }

   componentDidUpdate(){
      if (this.serverCount !== this.props.currentUser.allServers.length) this.props.closeModal();
   }

   componentWillUnmount(){
      if (!this.joined){
         this.props.removeServerLocalState(this.serverId);
      }
   }

   render(){ 
      if (!this.props.servers[this.serverId]){
         return (
            <div>
            </div>
         )
      }

      return(
         <div className='base-modal'>
            { <h1>{this.props.servers[this.serverId].name}</h1> }
            
            <h1 id='avatar-placeholder'>Avatar</h1>

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

export default connect(mapStateToProps, mapDispatchToProps)(JoinServer);