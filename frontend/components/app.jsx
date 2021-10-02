import React from 'react';
import LoginFormContainer from './form_container/login_form_container'
import SignUpFormContainer from './form_container/sign_up_form_container'
import ServersContainer from './channel_containers/servers_container'
import DebugContainer from './debug/debug_container';
import { AuthRoute } from '../util/route_util';
import { Redirect } from 'react-router'
import {Route, Switch } from 'react-router-dom'
 
const App = () => (
   <div id='root-app'>
      <Switch> 
         <AuthRoute exact path='/' component={LoginFormContainer}/>
         <AuthRoute exact path='/register' component={SignUpFormContainer}/>
         <Route path='/channel' component={ServersContainer}/>
         
         <Redirect to='/' />
      </Switch>
   </div>
);

export default App;