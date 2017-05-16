import HomeBody from '../ui/HomeBody'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { chooseTimer } from '../../actions'

const mapStateToProps = ({ app }, props) => {
	const { completedTimers, timers, favorites } = app.user.timerInfo
	return {
		completedTimers,
		timers,
		favorites
	}
}

const mapDispatchToProps = dispatch =>
	({
		chooseTimer(obj) {
			dispatch(
				chooseTimer(obj)
			)
		},
		push(path) {
			dispatch(
				push(path)
			)
		},
		chooseTimer(obj) {
			dispatch(
				chooseTimer(obj)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(HomeBody);
