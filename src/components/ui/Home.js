import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import HomeBody from './HomeBody';
import Footer from './Footer';

const Home = (props) => {
	return (
		<div>
			<Header />
			<HomeBody />
			<Footer />
		</div>
	)
}

export default Home;
