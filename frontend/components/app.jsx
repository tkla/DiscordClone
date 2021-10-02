import React from 'react';
import LoginFormContainer from './form_container/login_form_container'
import SignUpFormContainer from './form_container/sign_up_form_container'
import ServersContainer from './channel_containers/servers_container'
import ChannelsContainer from './channel_containers/channels_container';
import PostsContainer from './channel_containers/posts_container';
import FriendListContainer from './channel_containers/friend_list_container';
import { AuthRoute } from '../util/route_util';
import { Redirect } from 'react-router'
import {Route, Switch } from 'react-router-dom'
 
const App = () => (
   <div id='root-app'>

      <AuthRoute exact path='/' component={LoginFormContainer}/>
      <AuthRoute exact path='/register' component={SignUpFormContainer}/>
      
      <Route path='/channels/*' component={ServersContainer}/>
      <Route path='/channels/*' component={ChannelsContainer}/>
      <Route path='/channels/*' component={PostsContainer}/>
      <Route path='/channels/*' component={FriendListContainer}/>
      {/* <Redirect to='/' /> */}

   </div>
);

export default App;