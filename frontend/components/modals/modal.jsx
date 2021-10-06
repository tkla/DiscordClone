import {connect} from 'react-redux'
import React from 'react';
import { closeModal } from '../../actions/modal_actions'
import CreateServerContainer from './create_server_container';
import JoinServer from './join_server';

function Modal({modal, closeModal}) {
   if (!modal) return null;

   let component;
   switch (modal) {
      case 'joinServer':
         component = <JoinServer />;
         break;
      case 'createServer':
         component = <CreateServerContainer/>;
         break;
      default:
         return null;
   }

   return (
      <div className="modal-background" onClick={closeModal}>
         <div className="modal-child" onClick={e => e.stopPropagation()}>
            { component }
         </div>
      </div>
   );
 }
 
const mapStateToProps = state => ({
   modal: state.ui.modal
});

const mapDispatchToProps = dispatch => ({
   closeModal: () => dispatch(closeModal)
})
 
 
export default connect(mapStateToProps, mapDispatchToProps)(Modal);