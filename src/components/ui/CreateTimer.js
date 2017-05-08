import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from '../containers/ConSavedTimers'
import * as timeFuncs from '../../timeHelpers'

class CreateTimer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timerName: props.timerName || "",
			restIncrement: props.restIncrement || "", 
			restTime: props.restTime || "",
			numIntervals: props.numIntervals || "",
			intervalTime: props.intervalTime || ""
		}
	}

	setStateFromProps = () => {
		console.log(`this.props`, this.props.timerName);
		
		const { timerName, restIncrement, restTime, numIntervals, intervalTime } = this.props;
		const arr = [timerName, restIncrement, restTime, numIntervals, intervalTime];
		const arrNames = ["timerName", "restIncrement", "restTime", "numIntervals", "intervalTime"];

		for (let i in arrNames) {
			const prop = arrNames[i];
			this.setState({ [prop]: arr[i] })
		}
	}

	handleChange(e) {
		const { setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement } = this.props;

		const val = e.target.value;
		const propName = e.target.name;
		console.log(`val`, val)
		console.log(`propName`, propName);
		;

		switch(propName) {
			case "timerName":
				setTimerName(val);
				break;
			case "numIntervals":
				setNumIntervals(val);
				break;
			case "restTime":
				setRestTime(val);
				break;
			case "intervalTime":
				setIntervalTime(val);
				break;
			case "restIncrement":
				setRestIncrement(val);
				break;
			default:
				break;
		}

		this.setState({
			[propName]: val
		})
	}

	totalTimeCalc = () => {
		let { numIntervals, intervalTime, restTime, restIncrement } = this.props;

		restTime = restTime ? restTime : 0;
		intervalTime = intervalTime ? intervalTime : 0;
		restIncrement = restIncrement ? restIncrement : 0;

		// all values in minutes
		const intervalMins = (numIntervals * intervalTime);
		const restIncrementTime = timeFuncs.addedIncrementTime(restIncrement, numIntervals - 1) / 60;
		const restMins = (restTime / 60) * (numIntervals-1) + restIncrementTime;
		const total = intervalMins + restMins;

		const totalMins = Math.floor(total/1);
		const totalSeconds = ((total - totalMins) * 60).toFixed(0);
		
		return `${totalMins} ${this.minuteCalc(totalMins)}, ${totalSeconds} ${this.secondCalc(totalSeconds)}`;
	}

	resetState = () => {
		for (let key of Object.keys(this.state)) {
			this.setState({
				[key]: ""
			})
		}
	}

	localSaveTimer = (e) => {
	
		e.preventDefault();

		const { saveTimer, clearTimerForm, timerName, numIntervals, intervalTime, restTime,restIncrement } = this.props;

		const totalTime = timeFuncs.calcTotalTime(numIntervals, intervalTime, restIncrement, restTime);

		const timerObj = {
			timerName,
			numIntervals,
			intervalTime,
			restTime,
			restIncrement,
			totalTime
		}

		saveTimer(timerObj);

		this.resetState();
		clearTimerForm();
	}

	minuteCalc = (val) => {
		return val == 1 ? "minute" : "minutes"
	}

	secondCalc = (val) => {
		return val == 1 ? "second" : "seconds"
	}

	interval = () => {
		return this.props.numIntervals == 1 ? " interval" : " intervals";
	}

	minutes = () => {
		return this.props.intervalTime != 1 ? " minutes" : " minute";
	}

	restSeconds = () => {
		return this.props.restTime != 1 ? " seconds" : " second";
	}

	restIncrementCalc = () => {
		return this.props.restIncrement !== 1 ? " seconds" : " second";
	}

	canSubmit = () => {
		const { intervalTime, numIntervals, timerName } = this.state;

		const { timers } = this.props;

		return (
						!numIntervals ||
						!intervalTime ||
						intervalTime === '0.00' ||
						!timerName ||
						timers.filter(objs => objs.timerName === timerName).length > 0
					)
	}

	render() {
		const { intervalTime, numIntervals, restIncrement, restTime, timerName, timers, setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement } = this.props;		  

		return (
			<div>
				{this.props.timers.length > 0 && <SavedTimers editCreateTimerState={this.setStateFromProps}/>}
				<h2>Create New Timer</h2>
				<form required className="new-timer">
					<span className="form-label">Timer Name:* </span>
					<input
								required type="text"
								name="timerName"
								placeholder="timer name"
								value={this.state.timerName}
								onChange={(e) => this.handleChange(e)}/>
					<span className="form-label">Number of Intervals:* </span>
					<input
								required type="number"
								name="numIntervals"
								placeholder="number of intervals"
								value={this.state.numIntervals}
								onChange={(e) => this.handleChange(e)}/>
					<span>&nbsp;{this.interval()}</span>
					<span className="form-label">Interval Time:*</span>
					<input
								required type="number"
								name="intervalTime"
								placeholder="interval time"
								value={this.state.intervalTime}
								onChange={(e) => this.handleChange(e)}/>
					<span>&nbsp;{this.minutes()}</span>
					<span className="form-label">Rest Time:</span>
					<input
								required type="number"
								name="restTime"
								placeholder="rest time"
								value={this.state.restTime}
								onChange={(e) => this.handleChange(e)}/>
					<span>&nbsp;{this.restSeconds()}</span>
					<span className="form-label">Rest Increment Per Set:</span>
					<input type="number"
								placeholder="rest increment per set"
								name="restIncrement"
								value={this.state.restIncrement}
								onChange={(e) => this.handleChange(e)}
								/>
				<span>&nbsp;{this.restIncrementCalc()}</span>
				<button
					type="submit"
					className="save-timer"
					disabled={this.canSubmit()}
					onClick={(e) => this.localSaveTimer(e)}>
						SAVE
					</button>
				</form>
			<div className="total-time"><h2>Total time: </h2>{this.totalTimeCalc()}</div>
		</div>
		)
	}
}

export default CreateTimer;
