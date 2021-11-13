import React from 'react';

// Modal for creating/editing servers 
export default class CreateServer extends React.Component {
   constructor(props) {
      super(props);

      if (this.props.form === 'edit') {
         let server = this.props.servers[this.props.serverId]
         this.state = {
            id: server.id,
            name: server.name,
            author_id: this.props.currentUser.id,
            description: server.description,
            avatar: '',
            avatar_url: server.avatar,
            submit: false,
         }
      } else {
         this.state = {
            name: '',
            author_id: this.props.currentUser.id,
            description: '',
            avatar: '',
            submit: false,
         }
      }

      this.handleInput = this.handleInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }


   componentDidUpdate(prevProps) {
      // If prev server prop does not equal current server, assume server has updated successfully and close modal.
      if (this.state.submit && prevProps.servers[this.props.serverId] !== this.props.servers[this.props.serverId])
         this.props.closeModal();
      // If prev server state is lesser length than current server state, assume creation successfull.
      if (this.props.form === 'create') {
         if (this.state.submit && Object.keys(prevProps.servers).length < Object.keys(this.props.servers).length) {
            this.props.closeModal();
         }
      }
   }

   handleInput(input) {
      return (e) => {
         this.setState({
            [input]: e.currentTarget.value,
         })
      }
   }

   handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append('server[name]', this.state.name);
      formData.append('server[author_id]', this.state.author_id);
      formData.append('server[description]', this.state.description);

      if (this.state.avatar) {
         formData.append('server[avatar]', this.state.avatar);
      }

      if (this.props.form === 'edit') this.props.getServerEdit(this.state.id, formData);
      else this.props.getServerCreate(formData);

      this.setState({
         submit: true,
      })
   }

   handleFile(e) {
      const reader = new FileReader();
      const file = e.currentTarget.files[0];

      if (file) {
         reader.readAsDataURL(file);
      } else {
         this.setState({ avatar_url: "", avatar: null });
      }

      reader.onloadend = () => {
         this.setState({
            avatar_url: reader.result,
            avatar: file
         });
      }
   }

   render() {
      let errors = '';
      let errMsg = '';
      if (this.props.errors.length) {
         errors = 'error'
         errMsg = " - " + this.props.errors.join(' ')
      }

      let header = '';
      let subHeader = '';
      let footer = '';
      if (this.props.form === 'create') {
         header = <h1>Create your server</h1>;
         subHeader = 
            <p className='gray-text'>
               Give your new server a personality with a name and an icon.
               You can always change it later.
            </p>
         footer = 
            <p className='gray-text'>
               By creating a server, you agree to Discord's
               <span>
                  <a href='https://discord.com/guidelines'> Community Guidelines.</a>
               </span>
            </p>
      } else {
         header = <h1>Server Settings</h1>;
         subHeader = <p className='gray-text'>Edit server information.</p>
      }

      return (
         <div className='base-modal'>
            {header}
            {subHeader}

            <div className='avatar'>
               <i className="far fa-save"></i>
            </div>

            <form className='registerForm' onSubmit={this.handleSubmit}>
               <label className={errors}>SERVER NAME
                  <span className='errorMessage'>{errMsg}</span>
                  <input type='text' value={this.state.name} onChange={this.handleInput('name')} />
               </label>

               <label>DESCRIPTION
                  <input type='text' value={this.state.description} onChange={this.handleInput('description')} />
               </label>

               <input className='submit' type='submit' value={this.props.form==='create' ? 'Create':'Save'} />
            </form>
            {footer}
         </div>
      )
   }
}