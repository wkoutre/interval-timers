import HomeBody from '../ui/HomeBody'
import { connect } from 'react-redux'

// const mapStateToProps = ({ app }, props) => {
// 	const { loggedIn } = app
// 	return {
// 		loggedIn
// 	}
// }

// const mapDispatchToProps = dispatch =>
// 	({
// 		logout() {
// 			dispatch(
// 				logout()
// 			)
// 		}
// 	})

export default connect()(HomeBody)
