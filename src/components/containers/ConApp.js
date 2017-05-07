import App from '../../routes'
import { logout } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { loggedIn } = app
	
	return {
		loggedIn
	}
}

// const mapDispatchToProps = dispatch =>
// 	({
// 		logout() {
// 			dispatch(
// 				logout()
// 			)
// 		}
// 	})

export default connect(mapStateToProps)(App)
