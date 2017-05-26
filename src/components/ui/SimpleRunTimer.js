// a partially complete rewrite, in the case the original one proves unstable

import React from 'react';
import Stopwatch from 'timer-stopwatch';
import * as timeFuncs from '../../timeHelpers'
import * as colors from '../../css/colors'
import * as _ from 'lodash'

const MS = 1000;

class RunTimer extends React.Component {
	constructor(props) {
		super(props);
		const { intervalTime, restIncrement, restTime, totalTime } = props;

		// everything in state is in milliseconds
		this.state = {
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime - restTime),
			intervalId: 0,
			intervalMs: intervalTime,
			restMs: restTime,
			active: "interval",
			timeElapsed: 0,
			timeRemaining: props.totalTime - props.restTime,
			running: false,
			go: new Audio(`${props.audio.go}`),
			rest: new Audio(`${props.audio.rest}`),
			timerComplete: new Audio(`${props.audio.timerComplete}`)
		}
	}

	componentDidMount() {
		const { canWidth, canHeight } = this.getCanInfo();

		this.fillCanvasText({
			text: 'Touch to Start',
			align: 'center',
			fontSize: "30px",
			font: "Calibri",
			canWidth: canWidth,
			canHeight: canHeight+(canHeight/10)
		});
	}

	componentWillUnmount() {
		this.props.clearTimerForm();
		clearInterval(this.state.intervalId)
	}

	resetState = () => {
		const { totalTime, intervalTime, restTime } = this.props;

		this.setState({
			completedIntervals: 0,
			totalTimer: new Stopwatch(totalTime - restTime),
			intervalId: 0,
			intervalMs: intervalTime,
			restMs: restTime,
			active: "interval",
			timeElapsed: 0,
			timeRemaining: totalTime - restTime,
			running: false,
			go: new Audio(`${this.props.audio.go}`),
			rest: new Audio(`${this.props.audio.rest}`),
			complete: new Audio(`${this.props.audio.timerComplete}`)
		})
	}

	/***** CANVAS METHODS *****/

	getCanInfo = () => {
		const can = document.getElementById('timer-circle');
		const canHeight = can.height;				
		const canWidth = can.width;
		const ctx = can.getContext('2d');

		return({
			can,
			canHeight,
			canWidth,
			ctx
		})
	}

	fillCanvasText = (obj) => {
		const { ctx, canHeight, canWidth } = this.getCanInfo();
		ctx.font=`${obj.fontSize} ${obj.font}`;

		ctx.fillStyle = colors.white;
		if (obj.align) {
			ctx.textAlign=obj.align;
		}
		
		ctx.fillText(obj.text, obj.canWidth/2, obj.canHeight/2);
	}

		fillCanvasColor = (color, x=0, y=0, height) => {
		const { ctx, canWidth } = this.getCanInfo();

		ctx.fillStyle = color;
		ctx.fillRect(x, y, canWidth, height)
	}

	clearCanvas = () => {
		const { ctx, canHeight, canWidth } = this.getCanInfo();

		ctx.clearRect(0,0, canWidth, canHeight)
	}

	fillCanvasOnInterval = () => {
		const { canWidth, can, ctx, canHeight } = this.getCanInfo();
		const { completedIntervals, intervalMs } = this.state;
		const { numIntervals, intervalTime } = this.props;
		const fillHeight = (1 - ((intervalMs - MS) / intervalTime)) * canHeight;
		
		// fill can from the top with % of timer complete
		this.fillCanvasColor(colors.green, 0, 0, canHeight)

		// fill can from % of time complete to bottom with black
		ctx.font="50px Times"
		this.fillCanvasColor(colors.black1, 0, fillHeight, canHeight)	
		this.fillCanvasText({
			text: 'WORK',
			align: 'center',
			fontSize: "30px",
			font: "Calibri",
			canWidth: canWidth,
			canHeight: canHeight/1.5
		});

		this.fillCanvasText({
			text: `${completedIntervals}  / ${numIntervals} `,
			fontSize: "25px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight*1.1
		});

		this.fillCanvasText({
			text: `${timeFuncs.secondsToText(timeFuncs.msToSeconds(intervalMs))}`,
			fontSize: "25px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight*1.5
		});
	}

	fillCanvasOnRest = () => {
		const { canWidth, can, ctx, canHeight } = this.getCanInfo();
		const { completedIntervals, restMs } = this.state;
		const { numIntervals, restTime } = this.props;
		const fillHeight = (1 - ((restMs - MS) / restTime)) * canHeight;
		
		// fill can from the top with % of timer complete
		this.fillCanvasColor(colors.red, 0, 0, canHeight)

		// fill can from % of time complete to bottom with black
		ctx.font="50px Times"
		this.fillCanvasColor(colors.black1, 0, fillHeight, canHeight)	
		this.fillCanvasText({
			text: 'REST',
			align: 'center',
			fontSize: "30px",
			font: "Calibri",
			canWidth: canWidth,
			canHeight: canHeight/1.5
		});

		this.fillCanvasText({
			text: `${completedIntervals}  / ${numIntervals} `,
			fontSize: "25px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight*1.1
		});

		this.fillCanvasText({
			text: `${timeFuncs.secondsToText(timeFuncs.msToSeconds(restMs))}`,
			fontSize: "25px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight*1.5
		});
	}

	/***** TIMER METHODS ******/

	startTime = () => this.state.totalTimer.start();
	stopTime = () => this.state.totalTimer.stop();

	endTimer = () => {
		console.log('Timer is done!');

		this.stopTimer();
		this.state.timerComplete.play();

		const { canWidth, canHeight } = this.getCanInfo();

		// this.setState({
		// 	numIntervals: this.state.numIntervals+1,
		// 	timeElapsed: this.props.totalTime - this.props.restTime,
		// 	timeRemaining: 0
		// })

		this.clearCanvas();
		this.fillCanvasText({
			text: 'COMPLETE!',
			fontSize: "30px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight+(canHeight/10)
		})

		const { timerName } = this.props;
		const date = new Date();
		const hour = date.getHours();
		const minute = date.getMinutes();		
		const dateString = date.toDateString();
		const timeString = timeFuncs.timeToStr(hour, minute)
		const totalString = dateString + ' ' + timeString;
		const ms = date.getTime();

		console.groupCollapsed('Before Dispatching addCompletedTimer ');
		console.log(`ms`, ms);
		console.log(`timerName`, timerName);
		console.log(`dateString`, dateString);
		console.groupEnd('Before Dispatching addCompletedTimer ');
		
		this.props.addCompletedTimer({ dateString, ms, timerName });
	}

	resetTimer = () => {
		const { intervalTime, restIncrement, restTime, totalTime } = this.props;
		const { canWidth, canHeight } = this.getCanInfo();

		this.stopTimer();
		this.resetState();
		this.clearCanvas();
		this.fillCanvasText({
			text: 'Touch to Start',
			align: 'center',
			fontSize: "30px",
			font: "Calibri",
			canWidth: canWidth,
			canHeight: canHeight+(canHeight/10)
		});

		console.log('timer has been reset');
	}

	toggleIntervalRest = () => {
		if (this.state.timeRemaining <= 999) {
			this.endTimer();
		} else {
			let { timeElapsed, timeRemaining, intervalMs, restMs } = {...this.state};

			timeElapsed += MS;
			timeRemaining -= MS;

			this.setState({ timeElapsed, timeRemaining });

			if (this.state.active === 'interval') {
				intervalMs -= MS;
				this.fillCanvasOnInterval();
				if (intervalMs === 0 && this.state.totalTimer.ms > 0){
					this.setState({ 
						intervalMs: this.props.intervalTime,
						active: 'rest'
					})
					if (this.state.completedIntervals !== this.props.numIntervals)
						this.state.rest.play()
				} else {
					this.setState({ intervalMs })
				}
				// if it's a rest interval...
			} else {
				restMs -= MS;
				this.fillCanvasOnRest();
				if (restMs === 0){
					this.setState({ 
						restMs: this.props.restTime,
						active: 'interval',
						completedIntervals: this.state.completedIntervals + 1
					})
					this.state.go.play()
				} else {
					this.setState({ restMs })
				}
			}
		}
	}

	runTimer = () => {
		if (!this.state.running) {
			console.log(`running timer`);
			
			const running = true;
			const { totalTimer } = this.state;

			const intervalId = setInterval(this.toggleIntervalRest, MS);

			this.setState({ running, intervalId })

			// if it's the first time runTimer has been called
			if (this.state.completedIntervals === 0){
				this.clearCanvas();
				const completedIntervals = 1;
				this.state.go.play();
				this.setState({ completedIntervals })
			}

			this.startTime();
		}
	}

	stopTimer = () => {
		console.log(`stopping timer`);
		this.stopTime();

		const { intervalId } = this.state;
		const running = false;

		this.state.totalTimer.reset(this.state.timeRemaining)
		clearInterval(intervalId);
		this.setState({ running })
	}

	pixelRatio = () => {
		const ctx = document.createElement("canvas").getContext("2d"),
			dpr = window.devicePixelRatio || 1,
			bsr = ctx.webkitBackingStorePixelRatio ||
					ctx.mozBackingStorePixelRatio ||
					ctx.msBackingStorePixelRatio ||
					ctx.oBackingStorePixelRatio ||
					ctx.backingStorePixelRatio || 1;

		return (dpr / bsr);
	}

	render() {
		const { timerName,
		restIncrement,
		restTime,
		intervalTime,
		totalTime,
		numIntervals,
		incrementIntervals } = this.props;

		const { completedIntervals,
						intervalMs,
						restMs,
						timeElapsed,
						totalTimer,
						active,
						timeRemaining } = this.state;

		const { msToText } = timeFuncs;

		// const can = this.createHiDPIcan(200, 200);

		return (
			<div className="app-run-timer">
				<div className="run-timer__timer-totals">
					<h1>{timerName}</h1>
					<ul className="run-timer__timer-totals-ul">
						<li><span className="timer-totals__label">Total Intervals:</span> <span className="timer-totals__value">{numIntervals} intervals</span></li>
						<li><span className="timer-totals__label">Interval Time:</span> <span className="timer-totals__value">{timeFuncs.minToText(timeFuncs.msToMinutes(intervalTime))}</span></li>						
						<li><span className="timer-totals__label">Rest Time:</span> <span className="timer-totals__value">{timeFuncs.secondsToText(timeFuncs.msToSeconds(restTime))}</span></li>
						{restIncrement !== 0 && <li>Rest Increment: {timeFuncs.secondsToText(timeFuncs.msToSeconds(restIncrement))}</li>}
					</ul>
				</div>
				<canvas
					className="run-timer__timer-circle"
					id="timer-circle"
					onClick={() => !this.state.running && this.state.totalTimer.ms > 0 ? this.runTimer() : this.stopTimer()}
				></canvas>
				<div className="run-timer__timer-data">
					<p className="run-timer__timer-data-label">Time Elapsed: {timeFuncs.secondsToText(timeFuncs.msToSeconds(totalTime-timeRemaining-restTime))}</p>
					<p className="run-timer__timer-data-label">Time Remaining: {timeFuncs.secondsToText(timeFuncs.msToSeconds(timeRemaining))}</p>
					<button className="run-timer__button run-timer__reset" onClick={() => this.resetTimer()}>Reset</button>
				</div>
			</div>
		)
	}
}

export default RunTimer;
