import React from 'react';
import PropTypes from 'prop-types';
import SavedTimers from '../containers/ConSavedTimers'
import * as timeFuncs from '../../timeHelpers'

class CreateTimer extends React.Component {
	constructor(props) {

		super(props);
		const { setTimerName, setNumIntervals, setRestIncrement, setIntervalTime, setRestTime, defaultRestIncrement, defaultRestTime, defaultNumIntervals, defaultIntervalTime } = props;

		this.state = {
			timerName: props.timerName || "",
			restIncrement: props.timerName === "" ? "" : props.restIncrement,
			restTime: props.timerName === "" ? "" : props.restTime,
			numIntervals: props.timerName === "" ? "" : props.numIntervals,
			intervalTime:  props.timerName === "" ? "" : props.intervalTime,
			functions: [setTimerName, setNumIntervals, setRestIncrement, setIntervalTime, setRestTime],
			arrNames: ["timerName", "restIncrement", "restTime", "numIntervals", "intervalTime"],
			defaults: [defaultRestIncrement, defaultRestTime, defaultNumIntervals, defaultIntervalTime]
		}
	}

	// listen... I know this is kind of an anti-pattern, and rather round-about. But I have middleware that syncs the store to the server on every dispatch when the user is logged in (../../store/mainMiddleware/syncingMiddleware) so... unless I turn to a less server-intensive way of syncing, this is how this will work.

	resetToDefaults = () => {
		const arr = ["", ...this.state.defaults]		

		for (let i in this.state.arrNames) {
			const prop = this.state.arrNames[i];
			this.setState({ [prop]: arr[i] })
			this.runReduxStore(prop, arr[i])
		}
	}

	runReduxStore = (prop, val) => {
		switch(prop) {
				case "timerName":
					this.props.setTimerName(val);
					break;
				case "numIntervals":
					this.props.setNumIntervals(val);
					break;
				case "restTime":
					this.props.setRestTime(val);
					break;
				case "intervalTime":
					this.props.setIntervalTime(val);
					break;
				case "restIncrement":
					this.props.setRestIncrement(val);
					break;
				default:
					break;
			}
	}

	setStateFromProps = () => {	
		const { timerName, restIncrement, restTime, numIntervals, intervalTime } = this.props;
		const arr = [timerName, restIncrement, restTime, numIntervals, intervalTime];

		for (let i in this.state.arrNames) {
			const prop = this.state.arrNames[i];
			this.setState({ [prop]: arr[i] })
		}		
	}

	handleChange(e) {
		const { setTimerName, setNumIntervals, setRestTime, setIntervalTime, setRestIncrement } = this.props;
		const val = e.target.value;
		const propName = e.target.name;

		this.runReduxStore(propName, val)
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
		
		return `${totalMins} ${this.minuteText(totalMins)}, ${totalSeconds} ${this.secondText(totalSeconds)}`;
	}

	// resets State to blanks
	resetState = () => {

		for (let i in this.state.arrNames) {
			const prop = this.state.arrNames[i];
			this.setState({ [prop]: "" })
		}
		this.setState({ restIncrement: "" })
	}

	localSaveTimer = (e) => {
		e.preventDefault();

		const { saveTimer, clearTimerForm, timerName, numIntervals, intervalTime, restTime, restIncrement } = this.props;
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
	}

	minuteText = (val) => {
		return val == 1 ? "minute" : "minutes"
	}

	secondText = (val) => val == 1 ? "second" : "seconds"

	intervalText = () => this.props.numIntervals == 1 ? " interval" : " intervals"

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
				<label
					className="form-label"
					htmlFor="timerName">Timer Name:*</label>
					<input
								required type="text"
								name="timerName"
								placeholder="timer name"
								value={this.state.timerName}
								onChange={(e) => this.handleChange(e)}/>
					<label htmlFor="numIntervals" className="form-label">Number of Intervals:* </label>
					<input
								required type="number"
								name="numIntervals"
								placeholder="number of intervals"
								value={this.state.numIntervals}
								onChange={(e) => this.handleChange(e)}/>
					<span>&nbsp;{this.intervalText()}</span>
					<label htmlFor="intervalTime" className="form-label">Interval Time:*</label>
					<input
								required type="number"
								name="intervalTime"
								placeholder="interval time"
								value={this.state.intervalTime}
								onChange={(e) => this.handleChange(e)}/>
					<span>&nbsp;{this.minuteText(intervalTime)}</span>
					<label htmlFor="restTime" className="form-label">Rest Time:</label>
					<input
								required type="number"
								name="restTime"
								placeholder="rest time"
								value={this.state.restTime}
								onChange={(e) => this.handleChange(e)}/>
					<span>&nbsp;{this.secondText(restTime)}</span>
					<label htmlFor="restIncrement" className="form-label">Rest Increment Per Set:</label>
					<input type="number"
								placeholder="rest increment per set"
								name="restIncrement"
								value={!this.state.restIncrement ? "" : this.state.restIncrement}
								onChange={(e) => this.handleChange(e)}
								/>
				<span>&nbsp;{this.secondText(restIncrement)}</span>
				<button
					type="submit"
					className="save-timer"
					disabled={this.canSubmit()}
					onClick={(e) => this.localSaveTimer(e)}>
						SAVE
					</button>
				</form>
				<button onClick={() => this.resetState()}>CLEAR</button>
				<button onClick={() => this.resetToDefaults()}>DEFAULTS</button>
			<div className="total-time"><h2>Total time: </h2>{this.totalTimeCalc()}</div>
		</div>
		)
	}
}

export default CreateTimer;
