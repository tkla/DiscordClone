import React from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

export default class SessionForm extends React.Component {

   constructor(props) {
      super(props)
      this.usernameErr = false;
      this.emailErr = false;
      this.passwordErr = false;

      this.usernameMsg = '';
      this.emailMsg = '';
      this.passwordMsg = '';

      this.state = {
         username: '',
         password: '',
         email: '',
      }

      this.submitting = false;
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.submitDemoLogin = this.submitDemoLogin.bind(this);
   }

   componentWillUnmount() {
      this.props.clearErrors();
   }

   componentDidUpdate(prevProps, prevState) {
      let is_error = false;
      
      if (this.usernameErr && this.submitting){
         this.setState({username: '', password: ''});
         is_error = true;
      } 
      if (this.emailErr && this.submitting){
         this.setState({email: '', password: ''});
         is_error = true;
      } 
      if (this.passwordErr && this.submitting ){
         this.setState({password: ''});
         is_error = true;
      } 
      if (is_error) this.submitting = false;
   }

   submitDemoLogin(e) {
      e.preventDefault();
      let demo = {
         username: 'demo',
         password: '123456',
         email: 'demodemo@test.com'
      }
      this.props.processForm(demo);
      this.submitting = true;
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.processForm(this.state);
      this.submitting = true;
   }

   handleInput(input) {
      return (e) => {
         this.setState({
            [input]: e.currentTarget.value,
         })
      }
   }

   render() {
      let form = '';
      let window = 'loginWindow';

      this.usernameErr = false; 
      this.usernameMsg = '';
      this.emailErr = false; 
      this.emailMsg = '';
      this.passwordErr = false;
      this.passwordMsg = '';
         
      if (this.props.errors.length > 0) {
         for (let i = 0; i < this.props.errors.length; i++) {
            let errorMessage = this.props.errors[i].split(' ');
            
            switch (errorMessage[0]) {
               case 'Username': 
                  this.usernameErr = true;
                  if (this.usernameMsg.length === 1) this.usernameMsg += ', ';
                  if (this.usernameMsg.length === 0) this.usernameMsg += ' - ';
                  this.usernameMsg += this.props.errors[i];
                  break;
               case 'Email': 
                  this.emailErr = true;
                  if (this.emailMsg.length > 1) this.emailMsg += ', ';
                  if (this.emailMsg.length === 0) this.emailMsg += ' - ';
                  this.emailMsg += this.props.errors[i];
                  break;
               case 'Password': 
                  this.passwordErr = true;
                  if (this.passwordMsg.length > 1) this.passwordMsg += ', ';
                  if (this.passwordMsg.length === 0) this.passwordMsg += ' - ';
                  this.passwordMsg += this.props.errors[i];
                  break;
            }
         }
      }

      if (this.props.formType === 'Log In') {
         form = (
            <div id='loginContainer'>

               <div className='loginForm'>
                  <h2>Welcome back!</h2>
                  <p>We're so excited to see you again!</p>

                  <form onSubmit={this.handleSubmit}>
                     <label className={this.emailErr ? 'error' : ''}>EMAIL
                        <span className='errorMessage'>{this.emailMsg}</span>

                        <input type='text'
                           value={this.state.email}
                           onChange={this.handleInput('email')} />
                     </label>

                     <label className={this.passwordErr ? 'error' : ''}>PASSWORD
                        <span className='errorMessage'>{this.passwordMsg}</span>

                        <input type='password'
                           value={this.state.password}
                           onChange={this.handleInput('password')} />
                     </label>


                     <input className='submit' type='submit' value='Login' />
                  </form>

                  <p>
                     Need an account? <Link to='/register'>Register</Link> or login with a
                     <span> <a href='https://discord-tkla.herokuapp.com/?#/login' onClick={this.submitDemoLogin}>Demo Account.</a></span>
                  </p>
               </div>

               <div id='loginGreeting'>
                  <h2>Discord Clone</h2>
                  <p>A project aiming to replicate the browser version of Discord by Kenny La</p>
                  <a href='https://github.com/tkla/DiscordClone'><i className="fab fa-github"></i></a>
               </div>

            </div>
         )
      } else {
         window = 'registerWindow';
         form = (
            <div className='registerForm'>
               <h2>Create an account</h2>

               <form onSubmit={this.handleSubmit}>
                  <label className={this.emailErr ? 'error' : ''}>EMAIL
                     <span className='errorMessage'>{this.emailMsg}</span>
                     <input type='text'
                        value={this.state.email}
                        onChange={this.handleInput('email')} />
                  </label>

                  <label className={this.usernameErr ? 'error' : ''}>USERNAME
                     <span className='errorMessage'>{this.usernameMsg}</span>
                     <input type='text'
                        value={this.state.username}
                        onChange={this.handleInput('username')} />
                  </label>

                  <label className={this.passwordErr ? 'error' : ''}>PASSWORD
                     <span className='errorMessage'>{this.passwordMsg}</span>
                     <input type='password'
                        value={this.state.password}
                        onChange={this.handleInput('password')} />
                  </label>

                  <input className='submit' type='submit' value='Continue' />
               </form>
               <Link to='/'>Already have an account?</Link>
            </div>
         )
      }

      return (
         <div className={window}>
            {form}
         </div>
      )
   }
}