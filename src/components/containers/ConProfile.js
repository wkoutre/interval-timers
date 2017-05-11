import Profile from '../ui/Profile'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { fullName, email, photoURL } = app.user.details

	return {
		fullName,
		email,
		photoURL
	}
}

const mapDispatchToProps = dispatch =>
	({
		
	})

export default connect(mapStateToProps)(Profile);
