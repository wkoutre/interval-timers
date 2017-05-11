import Profile from '../ui/Profile'
import { connect } from 'react-redux'
import { setProfileInfo } from '../../actions'

const mapStateToProps = ({ app }, props) => {
	const { fullName, email, photoURL, location, weight, birthday, visibility } = app.user.details

	return {
		fullName,
		email,
		photoURL,
		location,
		weight,
		birthday,
		visibility
	}
}

const mapDispatchToProps = dispatch =>
	({
		setProfileInfo(infoObj) {
			dispatch(
				setProfileInfo(infoObj)
			)
		}		
	})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
