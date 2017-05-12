import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Footer = (props) => {
	return (
		<footer className="footer">
			<Link
				to="completed-timers"
				className="footer-item footer-completed">Logs</Link>
			<Link
			to="timers"
			className="footer-item footer-timers"
			>New Timer</Link>
			<Link
			to="saved-timers"
			className="footer-item footer-timers"
			>Saved Timers</Link>
		</footer>
	)
}

export default Footer;
