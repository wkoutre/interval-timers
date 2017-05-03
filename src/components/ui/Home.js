import React from 'react';
import PropTypes from 'prop-types';
import Header from '../containers/ConHeader';
import HomeBody from './HomeBody';
import Footer from './Footer';
import Login from '../containers/ConLogin';

class Home extends React.Component {

	shouldComponentUpdate(nextProps, nextState) {
		console.log('componentShouldUpdate');
		
		// watch out here...
		return this.props.uid !== nextProps.uid;
	}

	componentWillMount() {
		if (this.isLoggedIn()) {
			this.props.history.push('/');
		}
	}

	// need to change this to reference server
	isLoggedIn = () => {
		// return this.props.uid !== "";
		return localStorage['redux-workout-app'] !== undefined;
	}

	render() {
		const { history } = this.props;
		const home = (
				<div>
					<Header history={history}/>
					<HomeBody history={history}/>
					<Footer history={history}/>
				</div>
			)

		return (
			<div>
				{home}
			</div>
		) 
	}
}

export default Home;

// {this.checkLogin() ? home : <Login history={this.props.history}/>}
