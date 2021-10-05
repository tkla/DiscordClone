import React from 'react'


export default class Channel extends React.Component{

   constructor(props){
      super(props)
   }
   
   render(){
      let serverId = parseInt(this.props.match.params.id.substring(0,10)); 
      let server = this.props.servers[serverId];
      let channels = this.props.channels;

      if (this.props.match.url === '/channels/@me') {
         return (
            <div>
               <div className='channel-container' id='friend-list'>
                  You have no friends
               </div>
            </div>
         )
      }

      // Temp 
      if (Object.keys(this.props.channels).length === 0 || !server){
         return (
            <div>
               <div className='channel-container' id='friend-list'>
                  You have no friends
               </div>
            </div>
         )
      }

      return(
         <div> 
            <div className='channel-container' id='channels-list'>
               <h3 className='channel-header'>{server.name}</h3>

               <div className='collapse' id='text-channels'>
                  <ul className='text-channels-list'> 
                     {
                        server.allChannels.map( channelId=>  
                           <li>{channels[channelId] ? channels[channelId].name : "" }</li>
                        )
                     }
                  </ul>
               </div>
            </div>
         </div>
      )
   }
}