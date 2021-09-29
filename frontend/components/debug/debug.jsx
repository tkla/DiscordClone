import React from 'react';
import { Link } from 'react-router-dom';

const Debug = (props) => {
   let link = '';
   if (props.currentUser) {
      link = <button onClick={() => props.logout()}>Logout</button>

   } else {
      link = (
         <div>
            <Link to='/register'>Sign Up</Link>
            <br/>
            <Link to='/login'>Login</Link>
         </div>
      )
   }

   return (
      <div> 
         <h1>Debug</h1>
         {link}
      </div>
   )
}

export default Debug