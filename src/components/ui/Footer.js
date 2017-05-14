import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HeaderLink from '../containers/ConHeaderLink'
import completedTimers from '../../css/icons/png/completedTimers.png'
import home from '../../css/icons/png/home.png'
import profile from '../../css/icons/png/profile.png'
import settings from '../../css/icons/png/settings.png'
import timer from '../../css/icons/png/timer.png'
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
				<img
				 	src={home}
				 	alt="home"
				 	className="footer-image"
				 />
			</HeaderLink>
			<HeaderLink
				classname="header-profile-button footer-item"
				to="profile">
				<img
				 	src={profile}
				 	alt="profile"
				 	className="footer-image"
				 />
			</HeaderLink>
			<HeaderLink
				classname="header-settings-button footer-item"
				to="settings">
				<img
				 	src={settings}
				 	alt="settings"
				 	className="footer-image"
				 />
			</HeaderLink>
			<HeaderLink
				to="completed-timers"
				classname="footer-item footer-completed">
				<img
				 	src={completedTimers}
				 	alt="completed timers"
				 	className="footer-image"
				 />
			</HeaderLink>
			<HeaderLink
				to="create-timer"
				classname="footer-item footer-completed footer-timers">
				&#43;
			</HeaderLink>
			<HeaderLink
				to="saved-timers"
				classname="footer-item footer-timers">
				<img
				 	src={timer}
				 	alt="saved timers"
				 	className="footer-image"/>
			</HeaderLink>
		</footer>
	)
}

export default Footer;
