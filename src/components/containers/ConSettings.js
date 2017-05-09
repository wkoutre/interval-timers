import Settings from '../ui/Settings'
import { setDefaultRestTime, setDefaultIntervalTime, setDefaultRestIncrement, setDefaultNumIntervals } from '../../actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const mapStateToProps = ({ app }, props) => {
	const { defaultRestTime, defaultIntervalTime, defaultNumIntervals, defaultRestIncrement } = app.user.timerInfo.defaults;
	
	return {
		defaultRestTime,
		defaultIntervalTime,
		defaultNumIntervals,
		defaultRestIncrement
	}
}

const mapDispatchToProps = dispatch =>
	({
		setDefaultRestTime(time) { dispatch( setDefaultRestTime(time)) },
		setDefaultIntervalTime(time) { dispatch( setDefaultIntervalTime(time)) },
		setDefaultRestIncrement(increment) { dispatch( setDefaultRestIncrement(increment)) },
		setDefaultNumIntervals(intervals) { dispatch( setDefaultNumIntervals(intervals)) }
	})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
