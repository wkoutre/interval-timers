import Login from '../ui/Login'
import { login, setInitialState, setunsubscribeSyncId } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { uid } = app.user;
	const { loggedIn } = app;

	return { uid, loggedIn };
}

const mapDispatchToProps = dispatch =>
	({
		login(uid) {
			dispatch(
				login(uid)
			)
		},
		setInitialState(obj) {
			dispatch(
				setInitialState(obj)
			)
		},
		setunsubscribeSyncId(obj) {
			dispatch(
				setunsubscribeSyncId(obj)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
