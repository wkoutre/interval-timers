import RunTimer from '../ui/RunTimer'
// import { startTimer, stopTimer, incrementIntervals } from '../../actions'
import { chooseTimer } from '../../actions'
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
		numIntervals
	};
}
	
const mapDispatchToProps = (dispatch) =>
	({
		chooseTimer() {
			dispatch(
				chooseTimer(currentTimerObj)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(RunTimer);
