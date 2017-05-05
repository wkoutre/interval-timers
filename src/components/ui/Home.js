import React from 'react';
import PropTypes from 'prop-types';
import Header from '../containers/ConHeader';
import HomeBody from './HomeBody';
import Footer from './Footer';
import Login from '../containers/ConLogin';

class Home extends React.Component {

	render() {
		return (
			<div>
				<Header history={this.props.history}/>
				<HomeBody history={this.props.history}/>
				<Footer history={this.props.history}/>
			</div>
		) 
	}
}

export default Home;

// {this.checkLogin() ? home : <Login history={this.this.props.history}/>}
