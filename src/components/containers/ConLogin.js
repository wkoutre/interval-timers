import Login from '../ui/Login'
import { login, setInitialState, setFullName, setEmail, setPhotoURL } from '../../actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

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
		push(path) {
			dispatch(
				push(path)
			)
		},
		setFullName(name) {
			dispatch(
				setFullName(name)
			)
		},
		setEmail(email) {
			dispatch(
				setEmail(email)
			)
		},
		setPhotoURL(url) {
			dispatch(
				setPhotoURL(url)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
