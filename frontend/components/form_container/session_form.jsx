import React from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

export default class SessionForm extends React.Component {

   constructor(props){
      super(props)

      this.state = {
         username: 'demo',
         password: '123456',
         email: 'demodemo@test.com',
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInput = this.handleInput.bind(this);
   }

   handleSubmit(){
      this.props.processForm(this.state);
      this.setState({
         username: '',
         password: '',
         email: '',
      })
   }

   handleInput(input){
      return (e) => {
         this.setState({
            [input] : e.currentTarget.value,
         })
      }
   }

   render(){
      let form = '';
      let window = 'loginWindow';
      if (this.props.formType === 'Log In') {
         form = (
            <div id='loginContainer'>

               <div className='loginForm'>
                  <h2>Welcome back!</h2>
                  <span>We're so excited to see you again!</span>

                  <form onSubmit={this.handleSubmit}> 
                     <label className='formLabel'>EMAIL OR PHONE NUMBER
                        
                        <input type='text' 
                        value={this.state.email} 
                        onChange={this.handleInput('email')}/>
                     </label>
                     
                     <label className='formLabel'>PASSWORD
                        
                        <input type='password' 
                        value={this.state.password} 
                        onChange={this.handleInput('password')}/>
                     </label>
                     

                     <input className='submit' type='submit' value='Login'/>
                  </form>

                  <span>Need an account? <Link to='/register'>Register</Link></span>
               </div>

               <div id='loginGreeting'>
                  <h2>Discord Clone</h2>
                  <p>A project aiming to replicate the browser version of Discord by Kenny La</p>
                  <a href='https://github.com/tkla/DiscordClone'>Github</a>
               </div>

            </div>
         )
      } else {
         window = 'registerWindow';
         form = (
            <div className='registerForm'>
               <h2>Create an account</h2>

               <form onSubmit={this.handleSubmit}> 
                  <label className='formLabel'>EMAIL 
                     <input type='text' 
                     value={this.state.email} 
                     onChange={this.handleInput('email')}/>
                  </label>

                  <label className='formLabel'>USERNAME 
                     <input type='text' 
                     value={this.state.username} 
                     onChange={this.handleInput('username')}/>
                  </label>

                  <label className='formLabel'>PASSWORD
                     <input type='password' 
                     value={this.state.password} 
                     onChange={this.handleInput('password')}/>
                  </label>

                  <input className='submit' type='submit' value='Continue'/>
               </form>
               <Link to='/login'>Already have an account?</Link>
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