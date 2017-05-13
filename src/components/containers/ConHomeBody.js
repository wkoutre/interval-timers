import HomeBody from '../ui/HomeBody'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { completedTimers } = app.user.timerInfo
	return {
		completedTimers
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

export default connect(mapStateToProps)(HomeBody)
