import CreateTimer from '../ui/CreateTimer'
import { clearTimerForm, setTimerName, saveTimer, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement, editTimer, deleteTimer, chooseTimer, setTotalTime } from '../../actions'
import { connect } from 'react-redux'
import * as timeFuncs from '../../timeHelpers'

const mapStateToProps = ({ app }, props) => {
	const { timerInfo } = app.user;
	const { uid } = app.user.details;
	const { timerName, intervalTime, numIntervals, restIncrement, restTime } = timerInfo.timerProps;
	const { timers } = timerInfo;
	const { defaultIntervalTime, defaultNumIntervals, defaultRestIncrement, defaultRestTime } = timerInfo.defaults;

	return {
		intervalTime,
		numIntervals,
		restIncrement,
		restTime,
		timerName,
		timers,
		uid,
		defaultIntervalTime,
		defaultNumIntervals,
		defaultRestIncrement,
		defaultRestTime
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
		clearTimerForm() {
			dispatch(
				clearTimerForm()
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
