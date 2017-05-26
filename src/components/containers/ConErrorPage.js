import { ErrorPage } from '../ui/ErrorPage'
import { connect } from 'react-redux'
import { history } from '../../store/store'
import { refreshToLogin } from '../../actions'

// const mapStateToProps = ({ app }, props) => {
// 	return {
// 		history
// 	};
// }

	
export default connect(null, { refreshToLogin })(ErrorPage);
