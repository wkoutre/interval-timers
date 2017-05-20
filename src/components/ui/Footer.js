import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FooterLink from '../containers/ConFooterLink'
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
			<FooterLink
				classname="header-home-button footer-item"
				to="home">
				<img
				 	src={home}
				 	alt="home"
				 	className="footer-image"
				 />
			</FooterLink>
			<FooterLink
				classname="header-profile-button footer-item"
				to="profile">
				<img
				 	src={profile}
				 	alt="profile"
				 	className="footer-image"
				 />
			</FooterLink>
			<FooterLink
				classname="header-settings-button footer-item"
				to="settings">
				<img
				 	src={settings}
				 	alt="settings"
				 	className="footer-image"
				 />
			</FooterLink>
			<FooterLink
				to="completed-timers"
				classname="footer-item footer-completed">
				<img
				 	src={completedTimers}
				 	alt="completed timers"
				 	className="footer-image"
				 />
			</FooterLink>
			<FooterLink
				to="create-timer"
				classname="footer-item footer-completed footer-timers">
				&#43;
			</FooterLink>
			<FooterLink
				to="saved-timers"
				classname="footer-item footer-timers">
				<img
				 	src={timer}
				 	alt="saved timers"
				 	className="footer-image"/>
			</FooterLink>
		</footer>
	)
}

export default Footer;
