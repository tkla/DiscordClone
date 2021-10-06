import React from 'react';
import {Route, Switch } from 'react-router-dom'
import { Redirect } from 'react-router'
// Session components
import LoginFormContainer from './form_container/login_form_container'
import SignUpFormContainer from './form_container/sign_up_form_container'
// Main page components
import ServersContainer from './channel_containers/servers_container'
import ChannelsContainer from './channel_containers/channels_container';
import PostsContainer from './channel_containers/posts_container';
import UserListContainer from './channel_containers/user_list_container';
import FriendsContainer from './channel_containers/friends_container';
// Protected = Require logged in. Redirects to login path.
// Auth = Require logged out. Redirects to /channels/@me which is currently the home page
import { AuthRoute, ProtRoute } from '../util/route_util';
// Modal component
import Modal from './modals/modal'


 
const App = () => (
   <div id='root-app'>
      {/* <Modal/> */}
      <AuthRoute exact path='/' component={LoginFormContainer}/>
      <AuthRoute exact path='/register' component={SignUpFormContainer}/>
      
      <ProtRoute path='/channels/:id' component={ServersContainer}/>
      <ProtRoute exact path='/channels/@me' component={FriendsContainer}/>
      <ProtRoute path='/channels/:id(\d+)' component={ChannelsContainer}/>
      <ProtRoute path='/channels/:id(\d+)' component={PostsContainer}/>
      <ProtRoute path='/channels/:id(\d+)' component={UserListContainer}/> 
      {/* <Redirect to='/' /> */}

   </div>
);

export default App;