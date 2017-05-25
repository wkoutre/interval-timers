import App from '../routes'
import { login, logout, setInitialState, checkUserStatus, setFullName, setEmail, setPhotoURL, loggingIn, refreshToLogin } from '../../actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'


const mapStateToProps = ({ app }, props) => {

	const { loggedIn } = app
	const { audio } = app.user.timerInfo;

	return {
		loggedIn,
		audio
	}
}

const mapDispatchToProps = dispatch =>
	({
		logout() {
			dispatch(
				logout()
			)
		},
		login(uid) {
			dispatch(
				login(uid)
			)
		},
		setInitialState(store) {
			dispatch(
				setInitialState(store)
			)
		},
		checkUserStatus() {
			dispatch(
				checkUserStatus()
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
		},
		push(path) {
			dispatch(
				push(path)
			)
		},
		setLoggingIn() { dispatch( loggingIn() ) },
		refreshToLogin() { dispatch( refreshToLogin() ) }
	})

export default connect(mapStateToProps, mapDispatchToProps)(App)
