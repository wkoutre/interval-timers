import CreateTimer from '../ui/CreateTimer'
import { clearForm, setTimerName, saveTimer, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement, editTimer, deleteTimer, chooseTimer, setTotalTime } from '../../actions'
import { connect } from 'react-redux'
import * as timeFuncs from '../../timeHelpers'

const mapStateToProps = ({ app }, props) => {
	const { timerProps, uid } = app.user;
	const { timers, timerName, intervalTime, numIntervals, restIncrement, restTime } = timerProps;

	return {
		intervalTime,
		numIntervals,
		restIncrement,
		restTime,
		timerName,
		timers,
		uid
	}
}

const mapDispatchToProps = dispatch =>
	({
		setNumIntervals(val) {
			dispatch(
				setNumIntervals(val)
			)
		},
		setRestTime(val) {
			dispatch(
				setRestTime(val)
			)
		},
		setIntervalTime(val) {
			dispatch(
				setIntervalTime(val)
			)
		},
		setRestIncrement(val) {
			dispatch(
				setRestIncrement(val)
			)
		},
		setTimerName(name) {	
			dispatch(
				setTimerName(name)
			)
		},
		saveTimer(obj) {
			dispatch(
				saveTimer(obj)
			)
		},
		clearForm() {
			dispatch(
				clearForm()
			)
		},
		setTotalTime(ms) {
			dispatch(
				setTotalTime(ms)
			)
		},
		editTimer(props) {
			dispatch(
				editTimer(props)
			)
		},
		deleteTimer(props) {
			dispatch(
				deleteTimer(props)
			)
		},
		chooseTimer(props) {
			dispatch(
				chooseTimer(props)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTimer);
