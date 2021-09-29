import React from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

// # User Auth
// ## Functionality
// - [ ] The main button with logo should link to `/`
// - [ ] Has working demo login
// - [ ] Smooth, bug free navigation
// ### Before Login
// - [ ] The `/login` page should not display a link to `Log In`. Same for `/signup`
// - [ ] Going to a random route `/#/oweiniouewbrviuwebv` should redirect or display a 404 page
// - [ ] Errors should display for both `/signup` and `/login`.
// - [ ] Errors should clear when moving between `/signup` and `/login`.
// - [ ] Can sign up a user
// - [ ] Can sign in as a user
// - [ ] Can log out a user
// - [ ] Can't sign up with the same username/email
// - [ ] Pressing enter after filling out the session form should use the form data, not the demo user
// ### After Login
// - [ ] Should not be able to visit `/login` or `/signup`
// - [ ] Should be able to refresh the page and still be logged in
// ## Style
// - [ ] The elements are positioned correctly on the page
// - [ ] Remove Redux logger and all console.log()'s from production
// ## Seeds
// - [ ] Adequate and appropriate seeds

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

      if (this.props.formType === 'Log In') {
         form = (
            <div id='loginContainer'>

               <div className='sessionForm'>
                  <h2>Welcome back!</h2>
                  <span>We're so excited to see you again!</span>

                  <form onSubmit={this.handleSubmit}> 
                     <label className='form'>EMAIL OR PHONE NUMBER
                        <br/>
                        <input type='text' 
                        value={this.state.email} 
                        onChange={this.handleInput('email')}/>
                     </label>
                     <br/>

                     <label className='form'>PASSWORD
                        <br/>
                        <input type='text' 
                        value={this.state.password} 
                        onChange={this.handleInput('password')}/>
                     </label>
                     <br/>

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
         form = (
            <div className='sessionForm'>
               <h1>Create an account</h1>

               <form onSubmit={this.handleSubmit}> 
                  <label className='form'>EMAIL 
                     <br/>
                     <input type='text' 
                     value={this.state.email} 
                     onChange={this.handleInput('email')}/>
                  </label>
                  <br/>

                  <label className='form'>USERNAME 
                     <br/>
                     <input type='text' 
                     value={this.state.username} 
                     onChange={this.handleInput('username')}/>
                  </label>
                  <br/>

                  <label className='form'>PASSWORD
                     <br/>
                     <input type='text' 
                     value={this.state.password} 
                     onChange={this.handleInput('password')}/>
                  </label>
                  <br/>

                  <input className='submit' type='submit' value='Continue'/>
               </form>
               <Link to='/login'>Already have an account?</Link>
            </div>
         )
      }

      return (
         <div className='sessionWindow'>
            {form}
         </div>
      )
   }
}