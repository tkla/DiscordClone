import { connect } from 'react-redux'
import React from 'react';
import { closeModal } from '../../actions/modal_actions'
import CreateServerContainer from './create_server_container';
import JoinServer from './join_server';
import CreateChannel from './create_channel';
import EditUser from './edit_user';

function Modal(props) {
   if (!props.modal) return null;
   let component;

   // For each modal component, pass in props as needed but keep it minimal.
   switch (props.modal) {
      case 'joinServer':
         component = <JoinServer serverId={props.serverId} />;
         break;
      case 'createServer':
         component = <CreateServerContainer />;
         break;
      case 'createChannel':
         component = <CreateChannel serverId={props.serverId} />
         break;
      case 'userSettings':
         component = <EditUser />;
         break;
      default:
         return null;
   }

   return (
      <div className="modal-background">
         <div className="modal-close" onClick={props.closeModal} />
         <div className="modal-child" onClick={e => e.stopPropagation()}>
            {component}
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