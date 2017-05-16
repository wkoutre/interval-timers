import SavedTimers from '../ui/SavedTimers'
import { editTimer, deleteTimer, chooseTimer, sortDateAscending, sortDateDescending, sortTimersAZ, sortTimersZA, setFavorite, removeFavorite } from '../../actions'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

const mapStateToProps = ({ app }, props) => {
	const { timerInfo } = app.user;
	const { timers, favorites } = timerInfo;


	return {
		timers,
		favorites
	}
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
		},
		push(path) {
			dispatch(
				push(path)
			)
		},
		sortDateAscending() {
			dispatch(
				sortDateAscending()
			)
		},
		sortDateDescending() {
			dispatch(
				sortDateDescending()
			)
		},
		sortTimersZA() {
			dispatch(
				sortTimersZA()
			)
		},
		sortTimersAZ() {
			dispatch(
				sortTimersAZ()
			)
		},
		setFavorite(timerObj) {
			dispatch(
				setFavorite(timerObj)
			)
		},
		removeFavorite(timerName) {
			dispatch(
				removeFavorite(timerName)
			)
		}
	})
	

export default connect(mapStateToProps, mapDispatchToProps)(SavedTimers);
