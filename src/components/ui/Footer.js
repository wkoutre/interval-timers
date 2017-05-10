import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Footer = (props) => {
	return (
		<div className="footer">
			<Link to="completed-timers"><button>Completed Timers</button></Link>
			<Link to="timers"><button>View Timers</button></Link>
		</div>
	)
}

export default Footer;
