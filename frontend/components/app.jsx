import React from 'react';
import LoginFormContainer from './form_container/login_form_container'
import SignUpFormContainer from './form_container/sign_up_form_container'
import ServersContainer from './channel_containers/servers_container'
import ChannelsContainer from './channel_containers/channels_container';
import PostsContainer from './channel_containers/posts_container';
import UserListContainer from './channel_containers/user_list_container';
import { AuthRoute, ProtRoute } from '../util/route_util';
import { Redirect } from 'react-router'
import {Route, Switch } from 'react-router-dom'
 
const App = () => (
   <div id='root-app'>
      <AuthRoute exact path='/' component={LoginFormContainer}/>
      <AuthRoute exact path='/register' component={SignUpFormContainer}/>
      
      <ProtRoute path='/channels/:id' component={ServersContainer}/>
      <ProtRoute path='/channels/:id' component={ChannelsContainer}/>
      <ProtRoute path='/channels/:id' component={PostsContainer}/>
      <ProtRoute path='/channels/:id' component={UserListContainer}/>
      {/* <Redirect to='/' /> */}

   </div>
);

export default App;