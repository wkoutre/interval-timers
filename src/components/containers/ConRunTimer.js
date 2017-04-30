import RunTimer from '../ui/RunTimer'
import { startTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { timerName, restIncrement, restTime, intervalTime, numIntervals } = app.currentTimer.timerData;

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
