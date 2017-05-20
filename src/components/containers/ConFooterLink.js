import FooterLink from '../ui/FooterLink'
// import { startTimer, stopTimer, incrementIntervals } from '../../actions'
import { connect } from 'react-redux'

const mapStateToProps = ({ router }, props) => {
	let { pathname } = router.location;
	pathname = pathname.slice(1);
	return {
		pathname
	};
}

export default connect(mapStateToProps)(FooterLink);
