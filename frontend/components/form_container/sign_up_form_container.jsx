import SessionForm from "./session_form.jsx";
import {connect} from 'react-redux'
import {signUp} from '../../actions/session_actions'

const mapStateToProps = (state) => ({
   errors: state.errors.session,
   formType: 'Sign Up'
})

const mapDispatchToProps = dispatch => ({
   processForm: (user) => dispatch(signUp(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);