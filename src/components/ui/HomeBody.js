import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'
import * as timeFuncs from '../../timeHelpers'

class HomeBody extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			recents: [],
			favorites: [],
			lastThree: []
		}
	}

	componentDidMount() {
		let lastThree = [];
		const { completedTimers } = this.props;

		for (let i = 0, c = completedTimers.length - 1; i < 3; i++, c--) {
			completedTimers[c] && lastThree.push(completedTimers[c])
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
				<span className="home__recent-timers-span saved-timers__info-numIntervals">{timerName}</span>
				<span className="home__recent-timers-span saved-timers__info-numIntervals">{numIntervals} intervals</span>
				<span className="home__recent-timers-span saved-timers__info-restTime">{restTime} sec rest interval</span>
				<span className="home__recent-timers-span saved-timers__info-intervalTime">{intervalTime} min per interval</span>
				<span className="home__recent-timers-span saved-timers__info-restIncrement">{restIncrement} sec rest incr</span>
				<span className="home__recent-timers-span saved-timers__info-totalTime">{timeFuncs.msToText(totalTime)}</span>
				<span className="home__recent-timers-span" onClick={() => this.hideInfo(i)}>&#10006;</span>
			</li>
		)
	}

	recentTimers = (timer, i) => {
		const { timers } = this.props;
		
		if (this.state.recents[i]) {
			return this.listInfo(timer, i);
		} else {
			return (
				<li className="home__recent-timers-li" key={i} id={i}>
					<span>{timer.timerName}</span>
					<span
						onClick={() => this.showInfo(i)}
						className="saved-timers__info saved-timers__option">info
					</span>
					<span
						onClick={() => this.localChooseTimer(timers[i])}
						className="saved-timers__start-timer saved-timers__option">
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




		return (
			<div className="app-home">
				<div className="home__recent-timers">
					<h1>Recent Timers</h1>
					<ul className="home__recent-timers-ul">
						{lastThree}
					</ul>
				</div>
				<div className="home__favorite-timers">
					<h1>Favorites</h1>
					<ul className="home__favorite-timers-ul">
						<li className="home__favorite-timers-li">Favorite 1</li>
						<li className="home__favorite-timers-li">Favorite 2</li>
						<li className="home__favorite-timers-li">Favorite 3</li>
					</ul>
				</div>
			</div>
		)
	}
}

export default HomeBody;

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
