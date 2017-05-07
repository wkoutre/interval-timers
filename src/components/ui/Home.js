import React from 'react';
import PropTypes from 'prop-types';
import Header from '../containers/ConHeader';
import HomeBody from '../containers/ConHomeBody';
import Footer from '../containers/ConFooter';
import Login from '../containers/ConLogin';

class Home extends React.Component {

	render() {
		return (
			<div>
				<HomeBody history={this.props.history}/>
				<Footer history={this.props.history}/>
			</div>
		) 
	}
}

export default Home;
