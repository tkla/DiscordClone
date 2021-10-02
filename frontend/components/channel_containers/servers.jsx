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
         <div id='server_container'>
            <ul id='server_list'>
            {
               Object.keys(servers).map( s =>
                  <li className='server_item' key={s}>
                     {servers[s].name}
                  </li>
               )
            }
            </ul>

         </div>
      )
   }
}