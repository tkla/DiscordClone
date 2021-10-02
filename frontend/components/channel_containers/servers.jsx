import React from 'react'


export default class Servers extends React.Component {

   constructor(props){
      super(props);
   }

   componentDidMount(){
      this.props.getUserServers();
   }

   render(){
      let servers = this.props.servers.byId;
      return(
         <div id='server-container'>
            <p className='server-item' id='home-channel'>Me</p>
            <ul id='server_list'>
            {
               Object.keys(servers).map( s =>
                  <li className='server-item' key={s}>
                     {servers[s].name}
                  </li>
               )
            }
            </ul>

         </div>
      )
   }
}