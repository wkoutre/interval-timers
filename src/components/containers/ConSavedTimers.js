import SavedTimers from '../ui/SavedTimers'
import { editTimer, deleteTimer, chooseTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	// console.log(props);
	const { timerProps } = app;
	const { timers } = timerProps;

	return {
		timers
	};
}
	

const mapDispatchToProps = dispatch =>
	({
		editTimer,
		deleteTimer,
		chooseTimer
	})

export default connect(mapStateToProps, mapDispatchToProps)(SavedTimers);
