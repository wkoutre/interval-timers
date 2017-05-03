import Login from '../ui/Login'
import { login, setInitialState } from '../../actions'
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
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
