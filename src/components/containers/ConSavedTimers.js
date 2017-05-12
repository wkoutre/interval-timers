import SavedTimers from '../ui/SavedTimers'
import { editTimer, deleteTimer, chooseTimer } from '../../actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const mapStateToProps = ({ app }, props) => {
	const { timerInfo } = app.user;
	const { timers } = timerInfo;

	return {
		timers
	};
}
	

const mapDispatchToProps = dispatch =>
	({
		editTimer(obj) {
			dispatch(
				editTimer(obj)
			)
		},
		deleteTimer(obj) {
			dispatch(
				deleteTimer(obj)
			)
		},
		chooseTimer(obj) {
			dispatch(
				chooseTimer(obj)
			)
		},
		push(path) {
			dispatch(
				push(path)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(SavedTimers);
