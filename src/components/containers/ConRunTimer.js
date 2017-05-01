import RunTimer from '../ui/RunTimer'
import { startTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { timerName, restIncrement, restTime, intervalTime, numIntervals, intervalTimer, restTimer, totalTimer, totalTime, completedIntervals } = app.currentTimer.timerData;

	return {
		timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		completedIntervals,
		intervalTimer,
		restTimer,
		totalTimer,
	};
}
	
const mapDispatchToProps = dispatch =>
	({
		startTimer
	})

export default connect(mapStateToProps, mapDispatchToProps)(RunTimer);
