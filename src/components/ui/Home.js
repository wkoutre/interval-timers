import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'
import * as timeFuncs from '../../timeHelpers'
import { Link } from 'react-router-dom'

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			recents: [],
			favorites: [],
			lastThree: []
		}
	}

	// I only want to ever show, at most, the 3 (unique) most recently used timers
	componentDidMount() {
		let lastThree = [],
			names = [];
		const { completedTimers, timers } = this.props;

		for (let i = 0; i < completedTimers.length; i++) {
			const completedName = completedTimers[i].timerName;
			if (names.indexOf(completedName) === -1 && timers.filter(obj => obj.timerName === completedName).length > 0) {
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

	// sets the timer to be used in the RunTimer component

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

		this.props.chooseTimer(obj);
		this.props.push('run-timer')
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
		
		// if info if clicked...
		if (this.state.recents[i]) {
			return this.listInfo(timer, i);
		} else {
			return (
				<li className="home__recent-timers-li" key={`${i}-${i}`} id={i}>
					<span className="home__recent-timers-timer-name">{timer.timerName}</span>
					<span
						onClick={() => this.showInfo(i)}
						className="home__recent-timers-info-button">
							info
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
						{lastThree.length > 0 ?
							lastThree :
							<li className="home__recent-timers-li">
								<span className="home__recent-timers-timer-name">Nothing Completed Recently</span>
									<br/>
									<span className="home__favorite-timers-timer-text">Click the + to get started
								</span>
							</li>
						}
					</ul>
				</div>
				<div className="home__favorite-timers">
					<h1>Favorites</h1>
					<ul className="home__favorite-timers-ul">
						{favoriteTimers.length > 0 ?
							favoriteTimers :
							<li className="home__favorite-timers-li">
								<span className="home__favorite-timers-timer-name">No Favorites<br/>

								<span className="home__favorite-timers-timer-text">
									Star timers on the
								<Link to='/saved-timers'><span className="home__favorite-timers-timer-text home__favorite-timers-timer-name-link"> Saved Timers </span></Link>
								 page to add a favorite!
								</span></span>
							</li>
						}
					</ul>
				</div>
			</div>
		)
	}
}

export default Home;
