// import CompletedTimers from '../ui/CompletedTimers'
// import { removeCompletedTimer } from '../../actions'
// import { connect } from 'react-redux'

// const mapStateToProps = ({ app }, props) => {
// 	const { completedTimers } = app.user.timerInfo;

// 	return {
// 		completedTimers
// 	}
// }

// const mapDispatchToProps = dispatch =>
// 	({
// 		removeCompletedTimer(key) { dispatch(removeCompletedTimer(key))}
// 	})

// export default connect(mapStateToProps, mapDispatchToProps)(CompletedTimers);


import CompletedTimers from '../ui/CompletedTimersCal.js'
import { removeCompletedTimer } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { completedTimers } = app.user.timerInfo;

	return {
		completedTimers
	}
}

const mapDispatchToProps = dispatch =>
	({
		removeCompletedTimer(ms) { dispatch(removeCompletedTimer(ms))}
	})

export default connect(mapStateToProps, mapDispatchToProps)(CompletedTimers);
