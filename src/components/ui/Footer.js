import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderLink from '../containers/ConHeaderLink'
// import SVG from 'react-inlinesvg'
// import home from './../../css/icons/home.svg'

const Footer = (props) => {
	return (
		<footer className="footer">
			<span
				className="header-back-button footer-item"
				onClick={() => props.history.goBack()}>
					&larr;
			</span>
			<HeaderLink
				classname="header-home-button footer-item"
				to="home">
					&#8962;
			</HeaderLink>
			<HeaderLink
				classname="header-profile-button footer-item"
				to="profile">
					Profile
			</HeaderLink>
			<HeaderLink
				classname="header-settings-button footer-item"
				to="settings">
					&#9881;
			</HeaderLink>
			<Link
				to="completed-timers"
				className="footer-item footer-completed svg">LOGS

			</Link>
			<Link
				to="timers"
				className="footer-item footer-timers"
				>&#43;</Link>
			<Link
				to="saved-timers"
				className="footer-item footer-timers"
			>
				&#9716;
			</Link>
		</footer>
	)
}

export default Footer;
