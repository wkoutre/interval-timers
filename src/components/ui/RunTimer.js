import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'

class RunTimer extends React.Component {
	constructor(props) {
		super(props);
		const { intervalTime, restIncrement, restTime, totalTime } = props;

		// everything in state is in milliseconds
		this.state = {
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime),
			totalId: 0,
			intervalSecs: intervalTime,
			restSecs: restTime,
			newBreak: totalTime - intervalTime,
			active: "interval",
			timeElapsed: 0,
			timeRemaining: props.totalTime - props.restTime,
			running: false
		}
	}

	timerIsComplete = () => {
		return this.state.completedIntervals === this.props.numIntervals;
	}

	resetTimers = () => {
		const { intervalTime, restIncrement, restTime, totalTime } = this.props;

		this.stopTimer();
		this.setState({
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime),
			totalId: 0,
			id: 0,
			intervalSecs: intervalTime,
			restSecs: restTime,
			newBreak: totalTime - intervalTime,
			active: "interval",
			timeRemaining: totalTime - restTime,
			timeElapsed: 0,
			running: false
		})
		console.log('timer has been reset');
		
	}

	timerDoneTrigger = () => {
		console.log('Timer is done!');
		this.stopTimer();
	}

	changeInterval = () => {
		console.log("changing interval");
		
		this.setState({ intervalSecs: this.state.intervalSecs - 1000 })

		if (this.state.intervalSecs === 0) {
			this.setState({
				intervalSecs: this.props.intervalTime,
				active: "rest",
				completedIntervals: this.state.completedIntervals + 1
			 })

			this.state.completedIntervals === this.props.numIntervals && this.timerDoneTrigger();
		}
	}

	changeRest = () => {
		console.log("changing rest");
		this.setState({ restSecs: this.state.restSecs - 1000 })

		if (this.state.restSecs === 0) {
			this.setState({
				restSecs: this.props.restTime + (this.props.restIncrement * this.state.completedIntervals),
				active: "interval"
			 })
		}
	}

	runTimer = () => {
		if (this.timerIsComplete()) {
			alert('Timer is done. Click OK to reset it!', this.resetTimers());
			return ;
		} else if (!this.state.running) {
			const { totalTimer, restSecs, intervalSecs } = this.state;
			const { totalTime, restTime, intervalTime, restIncrement } = this.props;
			console.log('running Total Timer');
			totalTimer.onDone(this.timerDoneTrigger)
			totalTimer.start();
			
			const totalId = setInterval( () => {
				const { active } = this.state;
				const timeElapsed = this.state.timeElapsed + 1000;
				const sumRestIncrement = restIncrement * this.state.completedIntervals;
				// console.log(incrementIntervals);
				
				const timeRemaining = totalTime - restTime - sumRestIncrement - timeElapsed ;
				this.setState({ timeRemaining, timeElapsed })

				if (this.state.active === 'interval') {
					this.changeInterval();
				} else {
					this.changeRest();
				}
			}, 1000)

			this.setState({ totalId, running: !this.state.running })
		}
	}

	stopTimer = () => {
		if (this.state.running) {
			console.log('stopping timer');
		
			const { totalId, totalTimer } = this.state;
			totalTimer.stop()
			clearInterval(totalId);
			this.setState({ running: false })	
		}
	}

	render() {
		const { timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		incrementIntervals } = this.props;

		const { completedIntervals, intervalSecs, restSecs, timeElapsed, totalTimer, active, timeRemaining } = this.state;
		const { msToText } = timeFuncs;

		return (
			<div>
				<h1>{timerName}</h1>
				<div className="timer-totals">
					<h2>Timer Totals</h2>
					<ul>
						<li>Total Intervals: {numIntervals} intervals</li>
						<li>Interval Time: {msToText(intervalTime)}</li>						
						<li>Rest Time: {msToText(restTime)}</li>
						{restIncrement !== 0 && <li>Rest Increment: {msToText(restIncrement)}</li>}
					</ul>
				</div>
				<div className="timer">
					<button onClick={() => this.runTimer()}>Start</button>
					<button onClick={() => this.stopTimer()}>Stop</button>
					<button onClick={() => this.resetTimers()}>Reset</button>
				</div>
				<div>
				<p>Interval: {completedIntervals} / {numIntervals}</p>
				<p>Time Remaining in {active}: {active === "interval" ? msToText(intervalSecs) : msToText(restSecs)} </p>
				<p>Total Time Elapsed: {msToText(timeElapsed)}</p>
				<p>Total time remaining: {msToText(timeRemaining)}</p>
				</div>
			</div>
		)
	}
}

export default RunTimer;
