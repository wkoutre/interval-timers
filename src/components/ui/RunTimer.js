import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'
import * as colors from '../../css/colors'

class RunTimer extends React.Component {
	constructor(props) {
		super(props);
		const { intervalTime, restIncrement, restTime, totalTime } = props;

		// everything in state is in milliseconds
		this.state = {
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime - restTime),
			totalId: 0,
			intervalMs: intervalTime,
			restMs: restTime,
			newBreak: totalTime - intervalTime,
			active: "interval",
			timeElapsed: 0,
			timeRemaining: props.totalTime - props.restTime,
			running: false
		}
	}

	componentWillUnmount() {
		this.props.clearTimerForm();
	}

	resetTimers = () => {
		const { intervalTime, restIncrement, restTime, totalTime } = this.props;

		this.stopTimer();
		this.setState({
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime - restTime),
			totalId: 0,
			id: 0,
			intervalMs: intervalTime,
			restMs: restTime,
			newBreak: totalTime - intervalTime,
			active: "interval",
			timeRemaining: totalTime - restTime,
			timeElapsed: 0,
			running: false
		})

		const canvas = document.getElementById('timer-circle');
		const canvasHeight = canvas.height;				
		const ctx = canvas.getContext('2d');

		ctx.clearRect(0,0,1000,canvasHeight)
		console.log('timer has been reset');
		
	}

	timerDoneTrigger = () => {
		console.log('Timer is done!');
		// this.resetTimers();
		this.setState({ numIntervals: this.state.numIntervals+1 })

		const date = new Date();
		const weekDay = date.getDay();
		const day = date.getDate();
		const month = date.getMonth()+1;
		const hour = date.getHours();
		const minute = date.getMinutes();
		const year = date.getFullYear();
		
		const dateString = date.toDateString();
		const timeString = timeFuncs.timeToStr(hour, minute)

		const totalString = dateString + ' ' + timeString;
		const { timerName } = this.props;

		const copyTimerName = timerName.slice(0)
		const ms = date.getTime();

		console.groupCollapsed('Before Dispatching addCompletedTimer ');
			console.log(`ms`, ms);
			console.log(`timerName`, timerName);
			console.log(`dateString`, dateString);
		console.groupEnd('Before Dispatching addCompletedTimer ');
		
		this.props.addCompletedTimer({ dateString, ms, timerName });
	}

	changeInterval = () => {
		
		const intervalMs = this.state.intervalMs - 25;
		const canvas = document.getElementById('timer-circle');
		const canvasHeight = canvas.height;				
		const ctx = canvas.getContext('2d');

		const fillHeight = (1- (this.state.intervalMs / this.props.intervalTime)) * canvasHeight;				

		ctx.fillStyle = colors.green
		ctx.fillRect(0,0,1000,fillHeight)

		this.setState({ intervalMs })

		if ( intervalMs <= 0 ) {
			this.state.totalTimer.ms > 0 && console.log("changing interval");
			
		 	this.setState({
		 		intervalMs: this.props.intervalTime,
				active: "rest"
		 	})
			ctx.clearRect(0,0,1000,canvasHeight)
		}
	}

	changeRest = () => {
		const restMs = this.state.restMs - 25;
		const canvas = document.getElementById('timer-circle');
		const canvasHeight = canvas.height;				
		const ctx = canvas.getContext('2d');
		const fillHeight = (1- (this.state.restMs / this.props.restTime)) * canvasHeight;				
		let { completedIntervals } = this.state;

		ctx.fillStyle = colors.red
		ctx.fillRect(0,0,1000,fillHeight)

		this.setState({ restMs })
		if (this.state.restMs <= 0) {
			this.setState({
				restMs: this.props.restTime + (this.props.restIncrement * this.state.completedIntervals),
				active: "interval",
				completedIntervals: completedIntervals + 1
			 })
			console.log("changing rest");
			ctx.clearRect(0,0,1000,canvasHeight)
		}
	}

	runTimer = () => {
		if (!this.state.running) {
			const { totalTimer, restMs, intervalMs, completedIntervals } = this.state;
			const { totalTime, restTime, intervalTime, restIncrement } = this.props;

			if (completedIntervals === 0) {
				this.setState({ completedIntervals: completedIntervals + 1 })
			}

			console.log('running Total Timer');

			this.state.totalTimer.onDone(this.timerDoneTrigger)
			this.state.totalTimer.start()

			const totalId = setInterval( () => {
				const timeElapsed = this.state.timeElapsed + 25;
				const timeRemaining = totalTime - timeElapsed - restTime;

				// console.groupCollapsed('setInterval Timer');
				// 	console.log(`totalTime`, totalTime);
				// 	console.log(`timeElapsed`, timeElapsed);
				// 	console.log(`timeRemaining`, timeRemaining);	
				// console.groupEnd('setInterval Timer');	

				if (this.state.timeRemaining > 0) {
					this.setState({ timeRemaining, timeElapsed });
					if (this.state.active === 'interval') {
						this.changeInterval();
					} else if (this.state.active === 'rest') {
						this.changeRest();
					}
				}
			}, 25)

			this.setState({ totalId, running: !this.state.running })
		}
	}

	stopTimer = () => {
		const { totalId, totalTimer } = this.state;
		totalTimer.stop()
		clearInterval(totalId);
		this.setState({ running: false })	
	}

	// timerCircleStyle = {
	// 	"flex": "0 1 30%"
	// 	"width": "60%"

	// }

	render() {
		const { timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		incrementIntervals } = this.props;

		const { completedIntervals, intervalMs, restMs, timeElapsed, totalTimer, active, timeRemaining } = this.state;
		const { msToText } = timeFuncs;

		return (
			<div className="app-run-timer">
				<div className="run-timer__timer-totals">
					<h1>{timerName}</h1>
					<ul className="run-timer__timer-totals-ul">
						<li><span className="timer-totals__label">Total Intervals:</span> <span className="timer-totals__value">{numIntervals} intervals</span></li>
						<li><span className="timer-totals__label">Interval Time:</span> <span className="timer-totals__value">{msToText(intervalTime)}</span></li>						
						<li><span className="timer-totals__label">Rest Time:</span> <span className="timer-totals__value">{msToText(restTime)}</span></li>
						{restIncrement !== 0 && <li>Rest Increment: {msToText(restIncrement)}</li>}
					</ul>
				</div>
				<div  className="run-timer__buttons-div">
					<button className="run-timer__button run-timer__start" onClick={() => this.runTimer()}>Start</button>
					<button className="run-timer__button run-timer__stop" onClick={() => this.stopTimer()}>Stop</button>
					<button className="run-timer__button run-timer__reset" onClick={() => this.resetTimers()}>Reset</button>
				</div>
				<div className="run-timer__timer">
					<p>Interval {completedIntervals} / {numIntervals}</p>
					{this.state.totalTimer.ms > 0 ?
						<p>Time Remaining in {active}: {active === "interval" ? msToText(intervalMs) : msToText(restMs)} </p> :
						<p>You're done!</p>
					}
					<p>Total Time Elapsed: {msToText(timeElapsed - 1000)}</p>
					<p>Total Time Remaining: {msToText(this.state.timeRemaining)}</p>
				</div>
				<canvas style={this.timerCircleStyle} id="timer-circle" className="run-timer__timer-circle">

				</canvas>
			</div>
		)
	}
}

export default RunTimer;
