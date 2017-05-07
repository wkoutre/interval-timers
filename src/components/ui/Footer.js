import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Footer = (props) => {
	return (
		<div className="footer">
			<button>Past Workouts</button>
			<button>Logs</button>
			<Link to="timers"><button>Workout Timers</button></Link>
			<button>New Workout</button>
		</div>
	)
}

export default Footer;
