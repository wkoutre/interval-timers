import React from 'react';
import Stopwatch from 'timer-stopwatch';

const RunTimer = ({ timerName, intervalTime, numIntervals, restIncrement, restTime }) => {

	const runTimer = () => {
			const time = intervalTime * 60; // seconds

			const timer = new Stopwatch(time * 100);
			timer.start();
			const counter = setInterval( () => console.log(timer.ms), 1000)

			// fix this!
	}

	return (
		<div>
			<h1>{timerName}</h1>
			<div className="timer-totals">
				<h2>Timer Totals</h2>
				<ul>
					<li>Interval Time: {intervalTime}</li>
					<li>Total Intervals: {numIntervals}</li>
					<li>Rest Time: {restTime}</li>
					{restIncrement !== 0 && <li>Rest Increment: {restIncrement}</li>}
				</ul>
			</div>
			<div className="timer">
				<button onClick={() => runTimer()}>Start</button>
			</div>
		</div>
	)
}

export default RunTimer;
