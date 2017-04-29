import CreateTimer from '../ui/CreateTimer'
import { clearForm, setTimerName, saveTimer, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement, editTimer, deleteTimer, startTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ timers, timerName, intervalTime, numIntervals, restIncrement, restTime }, props) =>
	({
		intervalTime,
		numIntervals,
		restIncrement,
		restTime,
		timerName,
		timers
	})

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
		startTimer(props) {
			dispatch(
				startTimer(props)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTimer);
