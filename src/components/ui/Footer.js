import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Footer = (props) => {
	return (
		<footer className="app-footer">
			<Link
				to="completed-timers"
				className="footer-item">Completed Timers</Link>
			<Link
			to="timers"
			className="footer-item"
			>View Timers</Link>
		</footer>
	)
}

export default Footer;
