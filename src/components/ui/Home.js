import React from 'react';
import PropTypes from 'prop-types';
import Header from '../containers/ConHeader';
import HomeBody from './HomeBody';
import Footer from './Footer';
import Login from '../containers/ConLogin';

class Home extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		console.log('componentShouldUpdate');
		
		return this.props.uid !== nextProps.uid;
	}

	checkLogin = () => {
		return localStorage['workout-app'];
	}

	render() {
		const home = (
				<div>
					<Header />
					<HomeBody />
					<Footer />
				</div>
			)

		return (
			<div>
				{this.props.uid !== "" ? home : <Login />}
			</div>
		) 
	}
}

export default Home;
