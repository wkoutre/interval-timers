import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Footer = (props) => {
	return (
		<div className="footer">
			<Link to="past-workouts"><button>Past Workouts</button></Link>
			<Link to="timers"><button>View Timers</button></Link>
		</div>
	)
}

export default Footer;
