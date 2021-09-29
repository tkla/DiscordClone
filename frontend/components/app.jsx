import React from 'react';
import LoginFormContainer from './form_container/login_form_container'
import SignUpFormContainer from './form_container/sign_up_form_container'
import DebugContainer from './debug/debug_container';
import { AuthRoute } from '../util/route_util';
import {Route} from 'react-router-dom'
import debug_container from './debug/debug_container';

const App = () => (
   <div>
      <AuthRoute path='/login' component={LoginFormContainer}/>
      <AuthRoute path='/register' component={SignUpFormContainer}/>
      <Route exact path='/' component={DebugContainer}/> 
   </div>
);

export default App;