import {connect} from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
//Thunk action
import { getServerJoin } from '../../actions/server_actions';

const JoinServer = (props) => {
   console.log(props.match);
   return(
      <div>
         <h1>yea</h1>
      </div>
   )
}

const mapStateToProps = state => ({
   currentUser: state.entities.users[state.session.currentUserId],
})

const mapDispatchToProps = dispatch => ({
   getServerJoin: serverId => dispatch(getServerJoin(serverId)),
   closeModal: () => dispatch(closeModal),
})

export default connect(mapStateToProps, mapDispatchToProps)(JoinServer);