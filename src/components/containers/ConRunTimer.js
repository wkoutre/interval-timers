import RunTimer from '../ui/RunTimer'
// import { startTimer, stopTimer, incrementIntervals } from '../../actions'
import { chooseTimer, clearTimerForm, addCompletedTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { timerName, restIncrement, restTime, intervalTime, numIntervals, totalTime } = app.user.currentTimer.timerData;

	const { audio } = app.user.timerInfo;

	// const { completedIntervals, setIntervalTimer } = app.user.currentTimer;

	// const {  } = app.user.currentTimer

	return {
		timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		audio
	};
}
	
const mapDispatchToProps = (dispatch) =>
	({
		chooseTimer(timerObj) {
			dispatch(
				chooseTimer(timerObj)
			)
		},
		clearTimerForm() {
			dispatch(
				clearTimerForm()
			)
		},
		addCompletedTimer(date, timer) {
			dispatch(
				addCompletedTimer(date, timer)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(RunTimer);
