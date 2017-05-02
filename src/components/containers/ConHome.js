import Home from '../ui/Home'
import { connect } from 'react-redux'

const mapStateToProps = ({ app }, props) => {
	const { uid } = app.user;

	return { uid }
}

// const mapDispatchToProps = dispatch =>
// 	({

// 	})

export default connect(mapStateToProps)(Home)
