import Header from '../ui/Header'
import { logout } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	return {

	}
}

const mapDispatchToProps = dispatch =>
	({
		logout() {
			dispatch(
				logout()
			)
		}
	})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
