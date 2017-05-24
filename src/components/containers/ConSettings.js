import Settings from '../ui/Settings'
import { setDefaultRestMins, setDefaultIntervalMins, setDefaultIntervalSecs, setDefaultRestSecs, setDefaultRestIncrement, setDefaultNumIntervals } from '../../actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const mapStateToProps = ({ app }, props) => {
	const { defaultRestMins, defaultIntervalMins, defaultRestSecs, defaultIntervalSecs, defaultNumIntervals, defaultRestIncrement } = app.user.timerInfo.defaults;
	
	return {
		defaultRestMins,
		defaultRestSecs,
		defaultIntervalMins,
		defaultIntervalSecs,
		defaultNumIntervals,
		defaultRestIncrement
	}
}

const mapDispatchToProps = dispatch =>
	({
		setDefaultRestMins(time) { dispatch( setDefaultRestMins(time)) },
		setDefaultRestSecs(time) { dispatch( setDefaultRestSecs(time)) },
		setDefaultIntervalMins(time) { dispatch( setDefaultIntervalMins(time)) },
		setDefaultIntervalSecs(time) { dispatch( setDefaultIntervalSecs(time)) },
		setDefaultRestIncrement(increment) { dispatch( setDefaultRestIncrement(increment)) },
		setDefaultNumIntervals(intervals) { dispatch( setDefaultNumIntervals(intervals)) }
	})

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
