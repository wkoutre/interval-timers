import RunTimer from '../ui/RunTimer'
import { startTimer, stopTimer, incrementIntervals } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { timerName, restIncrement, restTime, intervalTime, numIntervals, totalTime } = app.currentTimer.timerData;

	const { completedIntervals } = app.currentTimer;

	const { setIntervalTimer } = app.currentTimer

	return {
		timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		completedIntervals,
		incrementIntervals
	};
}
	
const mapDispatchToProps = dispatch =>
	({
		startTimer(val) {
			dispatch(
				startTimer(val)
			)
		},
		stopTimer() {
			dispatch(
				stopTimer()
			)
		},
		incrementIntervals() {
			dispatch(
				incrementIntervals()
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(RunTimer);
