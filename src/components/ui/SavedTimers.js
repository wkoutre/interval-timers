import React from 'react';
import { Link } from 'react-router-dom'
import * as timeFuncs from '../../timeHelpers';
import Stopwatch from 'timer-stopwatch';
import * as colors from '../../css/colors'

class SavedTimers extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timers: new Array(props.timers.length).map(i => i = false),
			listener: -1
		}
	}

	// converting all values from timer to ms to pass into store

	localEditTimer = (data) => {
		this.props.editTimer(data)
		setTimeout(this.props.editCreateTimerState, 0);
		this.props.push('timers')
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

		return this.props.chooseTimer(obj);
	}

	showInfo = (i) => {
		let timers = [...this.state]
		timers[i] = true;

		this.setState({ timers })
	}

	hideInfo = (i) => {
		let timers = [...this.state]
		timers[i] = false;

		this.setState({ timers })		
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
						<span className="saved-timers__hide-info-button" onClick={() => this.hideInfo(i)}>&#10006;</span>
				</li>
				)
			} else {
				return (
				<li className="saved-timers__li" key={i} id={i}>
					<span className="saved-timers__timer-name">{obj.timerName}</span>
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
						<Link
							to="/run-timer"
							onClick={() => this.props.ChooseTimer(timers[i])}
							className="saved-timers__start-timer saved-timers__option">
							start
						</Link>
					</div>
				</li>
			)
		}
	});

	return (
		<div className="app-saved-timers">
			<h2>Saved Timers</h2>
			<div className="saved-timers__sorting-div">
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
