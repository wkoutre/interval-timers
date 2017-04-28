import Timer from '../ui/Timer'
import { clearForm, setTimerName, saveTimer, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement, editTimer } from '../../actions'
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
			console.log(props);
			dispatch(
				editTimer(props)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
