import Login from '../ui/Login'
import { login, setInitialState, setUnsubscribe } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { uid } = app.user;

	return { uid };
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
		setUnsubscribe(obj) {
			dispatch(
				setUnsubscribe(obj)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
