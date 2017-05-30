import React from 'react';
import PropTypes from 'prop-types';

class LoggingIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dots: 1,
			id: 0
		}
	}

	componentDidMount() {
		const id = setInterval(this.increaseDots, 500)

		this.setState({ id })
	}

	componentWillUnmount() {
		clearInterval(this.state.id);
	}

	// simple loading animation
	increaseDots = () => {
		let dots = this.state.dots;
		dots = dots === 5 ? 1 : dots + 1;

		this.setState({ dots })
	}



	render() {
		return (
		<div className="logging-in">
			<h1>Loading{'.'.repeat(this.state.dots)}</h1>
		</div>
		)	
	}
	
}

export default LoggingIn;	
