import {connect} from 'react-redux';
import React from 'react'
import { closeModal } from '../../actions/modal_actions';
import { getChannelCreate } from '../../actions/channel_actions';
import { clearErrors } from '../../actions/session_actions';

class CreateChannel extends React.Component {
   constructor(props){
      super(props)
      this.serverId = this.props.serverId;
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
         server_id: this.serverId,
         name: '',
         author_id: this.props.currentUser.id,
         voice_channel: (this.props.type === 'voice' ? true : false),
      }
   }

   // TODO error handling
   handleSubmit(e) {
      e.preventDefault();
      this.props.getChannelCreate(this.state).then(() => {
         if (this.props.errors.length === 0) {
            this.props.closeModal();
         }
      });
      // this.props.closeModal();
   }

   handleInput(input){
      return (e) => {
         this.setState({
            [input] : e.currentTarget.value,
         })
      }
   }

   render(){ 
      let errors = '';
      let errMsg = '';
      if (this.props.errors.length) {
         errors = 'error'
         errMsg = " - " + this.props.errors.join(' ')
      }
      // 
      let header = 'Text';
      if (this.state.voice_channel) header = 'Voice'
      return(
         <div className='base-modal'>
            <h1> Create {header} Channel </h1>
            <form className='generic-form' onSubmit={this.handleSubmit}>
               <label className={errors}>CHANNEL NAME
                  <span className='errorMessage'>{errMsg}</span>
                  <input id='input-channel-name' autoComplete='off' type='text' value={this.state.name} onChange={this.handleInput('name')}/>
               </label>
               <input type='submit' value='Create Channel'/>
            </form>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId],
   errors: state.errors.session,
})

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal),
   getChannelCreate: form => dispatch(getChannelCreate(form)),
   clearErrors: () => dispatch(clearErrors()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);