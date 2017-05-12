import SavedTimers from '../ui/SavedTimers'
import { editTimer, deleteTimer, chooseTimer, sortDateAscending, sortDateDescending, sortTimersAZ, sortTimersZA } from '../../actions'
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
		},
		sortDateAscending() {
			dispatch(
				sortDateAscending()
			)
		},
		sortDateDescending() {
			dispatch(
				sortDateDescending()
			)
		},
		sortTimersZA() {
			dispatch(
				sortTimersZA()
			)
		},
		sortTimersAZ() {
			dispatch(
				sortTimersAZ()
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(SavedTimers);
