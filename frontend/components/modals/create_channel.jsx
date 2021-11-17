import {connect} from 'react-redux';
import React from 'react'
import { closeModal } from '../../actions/modal_actions';
import { getChannelCreate } from '../../actions/channel_actions';

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
         voice_channel: false,
      }
   }

   // TODO error handling
   handleSubmit(e) {
      e.preventDefault();
      this.props.getChannelCreate(this.state);
      this.props.closeModal();
   }

   handleInput(input){
      return (e) => {
         this.setState({
            [input] : e.currentTarget.value,
         })
      }
   }

   render(){ 
      return(
         <div className='base-modal'>
            <h1> Create a Channel </h1>
            <form className='registerForm' onSubmit={this.handleSubmit}>
               <label>CHANNEL TYPE</label>

               <div>
                  <input type='radio' id='select-text' value='false' onClick={this.handleInput('voice_channel')}/>
                  <label htmlFor='select-text'>Text Channel</label>

                  <input type='radio' id='select-voice' value='true' onClick={this.handleInput('voice_channel')}/>
                  <label htmlFor='select-voice'>Voice Channel</label>
               </div>

               <label htmlFor='input-channel-name'>CHANNEL NAME</label>
               <input id='input-channel-name' autoComplete='off' type='text' value={this.state.name} onChange={this.handleInput('name')}/>
               
               <input type='submit' value='Create Channel'/>
            </form>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId]
})

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal),
   getChannelCreate: form => dispatch(getChannelCreate(form)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);