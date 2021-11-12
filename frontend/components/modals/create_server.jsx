import React from 'react';

export default class CreateServer extends React.Component {
   constructor(props){
      super(props);

      this.state = {
         name: '',
         author_id: this.props.currentUser.id,
         description: '',
      }

      if (this.props.form === 'edit') {
         this.state = {
            name: this.props.servers[this.props.serverId].name,
         }
      }
      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleInput(input){
      return (e) => {
         this.setState({
            [input] : e.currentTarget.value,
         })
      }
   }

   handleSubmit(e){
      e.preventDefault();
      this.props.getServerCreate(this.state);
      this.setState({ name : '' })
      this.props.closeModal();
   }

   render(){
      let errors = '';
      let errMsg = '';
      return (
         <div className='base-modal'>
            {/* <h1>Create a Server</h1>

            <p className='gray-text'>
               Your server is where you and your friends hang out. 
               Make yours and start talking.
            </p> */}

            <h1>Create your server</h1>
            <p className='gray-text'>
               Give your new server a personality with a name and an icon.
               You can always change it later.
            </p>
            
            <div className='avatar'>
               <i className="far fa-save"></i>
            </div>

            <form className='registerForm' onSubmit={this.handleSubmit}>
               <label className={errors}>SERVER NAME
                  <span className='errorMessage'>{errMsg}</span>
                  <input type='text' value={this.state.name} onChange={this.handleInput('name')}/>
               </label>

               <label className={errors}>DESCRIPTION
                  <input type='text' value={this.state.description} onChange={this.handleInput('description')}/>
               </label>

               <input className='submit' type='submit' value='Create' />
            </form>

            <p className='gray-text'>
               By creating a server, you agree to Discord's 
               <span> 
                  <a href='https://discord.com/guidelines'> Community Guidelines.</a>
               </span>
            </p>
            
         </div>
      )
   }
}