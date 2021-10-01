import SessionForm from "./session_form.jsx";
import {connect} from 'react-redux'
import {login, clearErrors} from '../../actions/session_actions'

const mapStateToProps = (state) => ({
   errors: state.errors.session,
   formType: 'Log In',
})

const mapDispatchToProps = (dispatch) => ({
   processForm: (user) => dispatch(login(user)),
   clearErrors: () => dispatch(clearErrors()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);