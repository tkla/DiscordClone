import React from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

export default class SessionForm extends React.Component {

   constructor(props) {
      super(props)

      this.state = {
         username: '',
         password: '',
         email: '',
      }


      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
      this.submitDemoLogin = this.submitDemoLogin.bind(this);
   }

   submitDemoLogin(e) {
      e.preventDefault();
      let demo = {
         username: 'demo',
         password: '123456',
         email: 'demodemo@test.com'
      }
      this.props.processForm(demo);
   }

   componentWillUnmount() {
      this.props.clearErrors();
   }

   handleSubmit(e) {
      e.preventDefault();
      this.props.processForm(this.state);
      this.setState({
         username: '',
         password: '',
         email: '',
      })
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

      let usernameErr = false;
      let usernameMsg = ' ';

      let emailErr = false;
      let emailMsg = ' ';

      let passwordErr = false;
      let passwordMsg = ' ';

      if (this.props.errors.length) {
         // errors = 'error'
         // errMsg = " - " + this.props.errors.join(' ')
         for (let i = 0; i < this.props.errors.length; i++) {
            if (this.props.errors[i].includes('Username')) {
               usernameErr = true;
               if (usernameMsg.length > 1) usernameMsg += ', ';
               usernameMsg += this.props.errors[i];
            }

            if (this.props.errors[i].includes('Email')) {
               emailErr = true;
               if (emailMsg.length > 1) emailMsg += ', ';
               emailMsg += this.props.errors[i] + ' ';
            }

            if (this.props.errors[i].includes('Password')) {
               passwordErr = true;
               if (passwordMsg.length > 1) passwordMsg += ', ';
               passwordMsg += this.props.errors[i] + ' ';
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
                     <label className={emailErr ? 'error' : ''}>EMAIL
                        <span className='errorMessage'>{emailMsg}</span>

                        <input type='text'
                           value={this.state.email}
                           onChange={this.handleInput('email')} />
                     </label>

                     <label className={passwordErr ? 'error' : ''}>PASSWORD
                        <span className='errorMessage'>{passwordMsg}</span>

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
                  <label className={emailErr ? 'error' : ''}>EMAIL
                     <span className='errorMessage'>{emailMsg}</span>
                     <input type='text'
                        value={this.state.email}
                        onChange={this.handleInput('email')} />
                  </label>

                  <label className={usernameErr ? 'error' : ''}>USERNAME
                     <span className='errorMessage'>{usernameMsg}</span>
                     <input type='text'
                        value={this.state.username}
                        onChange={this.handleInput('username')} />
                  </label>

                  <label className={passwordErr ? 'error' : ''}>PASSWORD
                     <span className='errorMessage'>{passwordMsg}</span>
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