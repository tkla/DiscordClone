import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/root'
import configureStore from './store/store'
import {logout} from './actions/session_actions'
import {getUserShow, getUsersIndex} from './actions/user_actions'

document.addEventListener('DOMContentLoaded', () => {
   const root = document.getElementById('root');
   let store;
   
   if (window.currentUser) {
      const preloadedState = {
         entities: {
            users: { [window.currentUser.id]: window.currentUser }
         },
         session: { currentUserId: window.currentUser.id }
      };
      store = configureStore(preloadedState);
      delete window.currentUser;
   } else {
      store = configureStore();
   }

   //Debug
   window.getState = store.getState;
   window.getUser = (id) => store.dispatch(getUserShow(id));
   window.getUsersIndex = (serverId) => store.dispatch(getUsersIndex(serverId)); 
   window.logout = () => store.dispatch(logout());
   //---
   ReactDOM.render(<Root store={store}/>, root);
})