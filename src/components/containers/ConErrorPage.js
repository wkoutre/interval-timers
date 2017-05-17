import { ErrorPage } from '../ui/ErrorPage'
import { connect } from 'react-redux'
import { history } from '../../store/store'

const mapStateToProps = ({ app }, props) => {
	return {
		history
	};
}
	
export default connect()(ErrorPage);
