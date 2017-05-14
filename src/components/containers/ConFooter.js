import Footer from '../ui/Footer'
import { connect } from 'react-redux'
import { history } from '../../store/store'

const mapStateToProps = ({ app }, props) => {
	return {
		history
	}
}

// const mapDispatchToProps = dispatch =>
// 	({
// 		logout() {
// 			dispatch(
// 				logout()
// 			)
// 		}
// 	})

export default connect(mapStateToProps)(Footer);
