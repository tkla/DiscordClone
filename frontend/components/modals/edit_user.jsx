import {connect} from 'react-redux';
import React from 'react'
import { closeModal } from '../../actions/modal_actions';
import {clearErrors} from '../../actions/session_actions';
import { getUserEdit } from '../../actions/user_actions';
class EditUser extends React.Component {
   constructor(props){
      super(props)
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);

      this.state = {
         username: this.props.currentUser.username,
         avatar: this.props.currentUser.avatar,
         submit: false,
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.clearErrors();
      // this.props.closeModal();
      this.props.getUserEdit(this.props.currentUser.id, this.state);
      this.setState({
         submit: true,
      })
   }

   componentDidUpdate(){
      if (this.state.submit && this.props.errors.length === 0) this.props.closeModal();
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
      if (this.props.errors.length){
         errors = 'error'
         errMsg = " - " + this.props.errors.join(' ')
      }
      return(
            <div className='base-modal'>
               <div className='registerForm'>
                  <h2>Edit</h2>

                  <form onSubmit={this.handleSubmit}> 
                     <label className={errors}>Username
                        <span className='errorMessage'>{errMsg}</span> 
                        <input type='text' 
                        value={this.state.username} 
                        onChange={this.handleInput('username')}/>
                     </label>

                     <label className={errors}>Profile Picture
                        <span className='errorMessage'>{errMsg}</span> 
                        <input type='file' 
                        value={this.state.avatar} 
                        onChange={this.handleInput('avatar')}/>
                     </label>

                     <input className='submit' type='submit' value='Continue'/>
                  </form>
               </div>
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
   clearErrors: () => dispatch(clearErrors()),
   getUserEdit: (userId, formUser) => dispatch(getUserEdit(userId, formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);