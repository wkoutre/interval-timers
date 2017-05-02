import Login from '../ui/Login'
import { login } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { uid } = app;

	return { uid };
}

const mapDispatchToProps = dispatch =>
	({
		login(uid) {
			dispatch(
				login(uid)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
