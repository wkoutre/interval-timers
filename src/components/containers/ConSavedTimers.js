import SavedTimers from '../ui/SavedTimers'
import { editTimer, deleteTimer, chooseTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { timerProps } = app;
	const { timers } = timerProps;

	return {
		timers
	};
}
	

const mapDispatchToProps = dispatch =>
	({
		editTimer(obj) {
			dispatch(
				editTimer(obj)
			)
		},
		deleteTimer(obj) {
			dispatch(
				deleteTimer(obj)
			)
		},
		chooseTimer(obj) {
			dispatch(
				chooseTimer(obj)
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(SavedTimers);
