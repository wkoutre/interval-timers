import React from 'react';
import { Link } from 'react-router-dom'
import * as timeFuncs from '../../timeHelpers';
import * as stringFuncs from '../../helpers/stringHelpers'
import Stopwatch from 'timer-stopwatch';
import * as colors from '../../css/colors'
import TimerLi from './TimerLi'

class SavedTimers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timers: new Array(props.timers.length).map(i => i = false),
			favoriteNames: props.favorites.reduce( (a, b) => a.concat(b[0].timerName), [])
		}
	}

	// converting all values from timer to ms to pass into store

	localEditTimer = (data) => {
		this.props.editTimer(data)
		setTimeout(this.props.editCreateTimerState, 0);
		this.props.push('create-timer')
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

	handleFavorite = (e, timerObj, index) => {

		if (e.target.style.color !== 'gold') {
			e.target.style.color = "gold"
			console.log(`indexHERE`, index);	
			this.props.setFavorite({index, timerObj});	
		} else {
			e.target.style.color = colors.white;
			this.props.removeFavorite(timerObj.timerName);	
		}		
	}

	showInfo = (i) => {
		let timers = [...this.state.timers]
		timers[i] = true;

		this.setState({ timers })
	}

	hideInfo = (i) => {
		let timers = [...this.state.timers]
		timers[i] = false;

		this.setState({ timers })		
	}

	handleSearch = (e) => {
		e.preventDefault();

		const val = e.target.value;
		const timerLis = document.getElementsByClassName('saved-timers__li');

		// timerLis.forEach(li => console.log(li.value));
		for (let i = 0; i < timerLis.length; i++) {
			const li = timerLis[i];
			const timerName = stringFuncs.wordToLowerCase(timerLis[i].firstChild.innerHTML);
			const searchValue = stringFuncs.wordToLowerCase(val)
			
			if (timerName.indexOf(searchValue) === -1) {
				timerLis[i].style.display = 'none'
			} else {
				timerLis[i].style.display = 'flex'
			}
		}	
	}

	render() {
		const { timers } = this.props;
		let timerNames = this.props.timers.map( (obj, i) => {
			const { numIntervals, restTime, intervalTime, restIncrement, totalTime } = obj;
			const editBox = <div>EDITING</div>

			if (this.state.timers[i]) {
				return (
					<li className="saved-timers__li" key={i} id={i}>
						<span className="saved-timers__info-value saved-timers__info-numIntervals">{numIntervals} intervals</span>
						<span className="saved-timers__info-value saved-timers__info-restTime">{restTime} sec rest interval</span>
						<span className="saved-timers__info-value saved-timers__info-intervalTime">{intervalTime} min per interval</span>
						<span className="saved-timers__info-value saved-timers__info-restIncrement">{restIncrement} sec rest incr</span>
						<span className="saved-timers__info-value saved-timers__info-totalTime">{timeFuncs.msToText(totalTime)}</span>
						<span className="saved-timers__hide-info-button" onClick={() => this.hideInfo(i)}>x</span>
				</li>
				)
			} else {
				
				return (
				<li className="saved-timers__li" key={i} id={i}>
					<span className="saved-timers__timer-name">{obj.timerName}
					<br/>
						<span onClick={(e) => this.handleFavorite(e, timers[i], i)} className="saved-timers__fav-button"
							style={this.state.favoriteNames.indexOf(obj.timerName) > -1 ? {"color": "gold"} : {"color": "white"} }>&#9733;</span>
					</span>
					
					<div className="saved-timers__buttons">
						<span
						onClick={() => this.localEditTimer(timers[i])}
						className="saved-timers__edit-timer saved-timers__option">edit</span>
						<span
						onClick={() => this.props.deleteTimer(timers[i])}
						className="saved-timers__delete-timer saved-timers__option">delete</span>
						<span
						onClick={() => this.showInfo(i)}
						className="saved-timers__info saved-timers__option">info</span>
						<span
							onClick={() => this.localChooseTimer(timers[i])}
							className="saved-timers__start-timer saved-timers__option">
							start
						</span>
					</div>
				</li>
			)
		}
	});



	return (
		<div className="app-saved-timers">
			<div className="saved-timers__header">
				<h1>Saved Timers</h1>
				<input
					placeholder="search timers..."
					type="text"
					className="saved-timers__search"
					onChange={(e) => this.handleSearch(e)}
					ref={ (e) => { this.searchVal = e; }}
					/>
				<button className="saved-timers__sort-button" onClick={() => this.props.sortDateAscending()}>old &rarr; new</button>
				<button className="saved-timers__sort-button" onClick={() => this.props.sortDateDescending()}>new &rarr; old</button>
				<button className="saved-timers__sort-button" onClick={() => this.props.sortTimersAZ()}>A &rarr; Z</button>
				<button className="saved-timers__sort-button" onClick={() => this.props.sortTimersZA()}>Z &rarr; A</button>
			</div>
			<ul className="saved-timers__ul">
				{timerNames}
			</ul>
		</div>
		)
	}
}

export default SavedTimers;

// <Link
// 	to="/run-timer"
// 	onClick={() => this.props.ChooseTimer(timers[i])}
// 	className="saved-timers__start-timer saved-timers__option">
// 	start
// </Link>
