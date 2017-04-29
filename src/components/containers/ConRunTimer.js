import RunTimer from '../ui/RunTimer'
import { startTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { currentTimer } = app;
	const { timerName, restIncrement, restTime, intervalTime, numIntervals } = currentTimer;

	return {
		timerName,
		restIncrement,
		restTime,
		intervalTime,
		numIntervals
	};
}
	
const mapDispatchToProps = dispatch =>
	({
		startTimer
	})

export default connect(mapStateToProps, mapDispatchToProps)(RunTimer);
