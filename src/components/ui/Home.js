import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'
import * as timeFuncs from '../../timeHelpers'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			recents: [],
			favorites: [],
			lastThree: []
		}
	}

	componentDidMount() {
		let lastThree = [],
			names = [];
		const { completedTimers } = this.props;

		for (let i = 0; i < completedTimers.length; i++) {
			if (names.indexOf(completedTimers[i].timerName) === -1) {
				lastThree.push(completedTimers[i]);
				names.push(completedTimers[i].timerName)
			}
			
			if (lastThree.length >= 3)
				break;
		}

		let recents = lastThree.reduce( (a, b) => {
			return a.concat(false)
		}, [])

		this.setState({ lastThree, recents })
	}

	localChooseTimer = ({ numIntervals, intervalTime, restTime, timerName, restIncrement }) => {
		
		const totalIntervalTime = timeFuncs.minToMs((numIntervals * intervalTime));
		const totalRestIncrementTime = timeFuncs.secToMs(timeFuncs.addedIncrementTime(restIncrement, numIntervals-1));
		const totalRestTime = timeFuncs.secToMs(restTime) * (numIntervals);

		// in ms
		const totalTime = totalIntervalTime + totalRestIncrementTime + totalRestTime;

		intervalTime = timeFuncs.minToMs(intervalTime);
		restTime = timeFuncs.secToMs(restTime);
		restIncrement = timeFuncs.secToMs(restIncrement);
		
		const obj = {
			intervalTime,
			restTime,
			numIntervals,
			timerName,
			restIncrement,
			totalTime
		}

		this.props.push('run-timer')
		this.props.chooseTimer(obj);
	}
	
	listInfo = (timer, i) => {
		const { completedTimers, timers } = this.props;
		const obj = timers.filter(obj => timer.timerName === obj.timerName);
		const timerObj = obj[0];
		const { numIntervals, restTime, intervalTime, restIncrement, totalTime } = timerObj;
		const { timerName } = timer;

		return (
			<li className="home__recent-timers-li" key={i} id={i}>
				<span className="home__recent-timers-info home__recent-timers-info-timerName">{timerName}</span>
				<span className="home__recent-timers-info home__recent-timers-info-numIntervals">{timeFuncs.intervalText(numIntervals)}</span>
				<span className="home__recent-timers-info home__recent-timers-info-restTime">{restTime} sec rest interval</span>
				<span className="home__recent-timers-info home__recent-timers-info-intervalTime">{timeFuncs.msToText(timeFuncs.minToMs(intervalTime))} per interval</span>
				<span className="home__recent-timers-info home__recent-timers-info-restIncrement">{restIncrement} sec rest incr</span>
				<span className="home__recent-timers-info home__recent-timers-info-totalTime">{timeFuncs.msToText(totalTime)}</span>
				<span className="home__recent-timers-hide-info" onClick={() => this.hideInfo(i)}>x</span>
			</li>
		)
	}

	recentTimers = (timer, i) => {
		const { timers } = this.props;
		
		if (this.state.recents[i]) {
			return this.listInfo(timer, i);
		} else {
			return (
				<li className="home__recent-timers-li" key={`${i}-${i}`} id={i}>
					<span className="home__recent-timers-timer-name">{timer.timerName}</span>
					<span
						onClick={() => this.showInfo(i)}
						className="home__recent-timers-info-button">info
					</span>
					<span
						onClick={() => this.localChooseTimer(timers[i])}
						className="home__recent-timers-start-button">
						start
					</span>
				</li>
			)	
		}
	}

	showInfo = (i) => {
		let recents = [...this.state.recents]
		recents[i] = true;

		this.setState({ recents })
	}

	hideInfo = (i) => {
		let recents = [...this.state.recents]
		recents[i] = false;

		this.setState({ recents })		
	}
	
	render() {

		// lastThree = lastThree.map(this.listInfo);
		const lastThree = this.state.lastThree.map(this.recentTimers);

		const favoriteTimers = this.props.favorites.map( (timerObj, i) => {
			const { timers } = this.props;

			return (
				<li key={i} className="home__favorite-timers-li">
					<span className="home__favorite-timers-timer-name">{timerObj[0].timerName}</span>
					<span
						onClick={() => this.localChooseTimer(timers[timerObj[1]])}
						className="home__recent-timers-start-button">
						start
					</span>
				</li>		
			)
		})

		return (
			<div className="app-home">
				<div className="home__recent-timers">
					<h1>Recents</h1>
					<ul className="home__recent-timers-ul">
						{lastThree}
					</ul>
				</div>
				<div className="home__favorite-timers">
					<h1>Favorites</h1>
					<ul className="home__favorite-timers-ul">
						{favoriteTimers}
					</ul>
				</div>
			</div>
		)
	}
}

export default Home;

// 	const storage = base.storage();
// 	const ref = storage.ref()
// 	const message = "Bahahahaha";

// 	const handleFileUpload = (file) => {
// 	  console.log(file.target);
	  
	  
// 	  this.props.actions.uploadRequest({
// 	     file,
// 	     name: 'Awesome Cat Pic'
// 	  })
// }
	

	// ref.child('strings/secondString').putString(message).then((snapshot) => {
 //  	console.log('Uploaded a raw string!');
	// });

	// object: key = date, 
