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
			timeRemaining: props.totalTime - props.restTime,
			running: false,
			can: ""
		}
	}

	componentDidMount() {
		const can = document.getElementById('timer-circle');
		const canHeight = can.height;				
		const canWidth = can.width;
		const ctx = can.getContext('2d');

		this.setState({
			can,
			canHeight,
			canWidth,
			ctx
		})

		const fillIt = () => {
			this.fillCanvasColor(colors.black1, 0, 0, canHeight)	
			this.fillCanvasText({
				text: 'START',
				align: 'center',
				fontSize: "30px",
				font: "Calibri",
				canWidth: canWidth,
				canHeight: canHeight+(canHeight/10)
			});
		}

		setTimeout(fillIt, 1);
	}

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

	componentWillUnmount() {
		this.props.clearTimerForm();
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

	resetTimers = () => {
		const { intervalTime, restIncrement, restTime, totalTime } = this.props;
		const { canWidth, canHeight } = this.getCanInfo();

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
			running: false
		})

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

	timerDoneTrigger = () => {

		this.stopTimer();
		const { canWidth, canHeight } = this.getCanInfo();

		console.log('Timer is done!');
		new Audio(`${this.props.audio.timerComplete}`).play()
		// this.resetTimers();
		this.setState({ numIntervals: this.state.numIntervals+1 })


		this.clearCanvas();
		setTimeout( () => this.fillCanvasText({
			text: 'COMPLETE!',
			fontSize: "30px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight+(canHeight/10)
		}), 100);

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
		
		const { completedIntervals  } = this.state;
		const { can, canHeight, canWidth, ctx } = this.getCanInfo();
		const { numIntervals } = this.props;
		const intervalMs = this.state.intervalMs - 25;
		const fillHeight = (1 - (this.state.intervalMs / this.props.intervalTime)) * canHeight;				

		// console.log(`intervalMs`, intervalMs);
		// console.log(`TotalTimer MS`, this.state.totalTimer.ms);

		// fill can from the top with % of timer complete
		this.fillCanvasColor(colors.green, 0, 0, canHeight)

		// fill can from % of time complete to bottom with black
		ctx.font="50px Times"
		this.fillCanvasColor(colors.black1, 0, fillHeight, canHeight)	

		// write text over the colors onto the can
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
			text: `${timeFuncs.msToText(intervalMs)}`,
			fontSize: "25px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight*1.5
		});

		this.setState({ intervalMs })
		
		if (this.timerIsComplete()) {
			this.timerDoneTrigger();
		} else if ( intervalMs <= 25 && completedIntervals !== numIntervals) {
			console.log(`change interval, making rest noise`);
			
			this.state.totalTimer.ms > 0 && console.log("changing interval");
			new Audio(`${this.props.audio.rest}`).play()
			
			this.setState({
				intervalMs: this.props.intervalTime,
				active: "rest"
			})
			ctx.clearRect(0,0,1000,canHeight)
		}
	}

	timerIsComplete = () => {
		const { completedIntervals, intervalMs } = this.state;
		const { numIntervals } = this.props;

		return (completedIntervals === numIntervals && intervalMs <= 100);
	}

	changeRest = () => {
		const { numIntervals } = this.props;
		const { can, canWidth, canHeight, ctx } = this.getCanInfo();
		const restMs = this.state.restMs - 25;
		const fillHeight = (1- (this.state.restMs / this.props.restTime)) * canHeight;
		let { completedIntervals } = this.state;

		this.fillCanvasColor(colors.red, 0, 0, fillHeight)
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
			text: `${timeFuncs.msToText(restMs)}`,
			fontSize: "25px",
			font: "Calibri",
			align: "center",
			canWidth: canWidth,
			canHeight: canHeight*1.5
		});

		this.setState({ restMs })
		if (this.state.restMs <= 0) {
			this.setState({
				restMs: this.props.restTime + (this.props.restIncrement * this.state.completedIntervals),
				active: "interval",
				completedIntervals: completedIntervals + 1
			 })
			new Audio(`${this.props.audio.go}`).play()
			ctx.clearRect(0,0,1000,canHeight)
		}
	}

	runTimer = () => {
		if (!this.state.running) {
			const { totalTimer, restMs, intervalMs, completedIntervals } = this.state;
			const { totalTime, restTime, intervalTime, restIncrement } = this.props;

			if (completedIntervals === 0) {
				this.setState({ completedIntervals: completedIntervals + 1 })
			}

			this.state.totalTimer.start()

			const totalId = setInterval( () => {
			const timeElapsed = this.state.timeElapsed + 25;
			const timeRemaining = totalTime - (totalTime-this.state.totalTimer.ms);

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

		const intervalTimeElapsed = (this.state.completedIntervals-1)*this.props.intervalTime+(this.props.intervalTime - this.state.intervalMs);
		const restTimeElapsed = (this.state.completedIntervals-1) * this.props.restTime;
		const totalElapsed = intervalTimeElapsed + restTimeElapsed;

		// console.log(`totalElapsed`, totalElapsed);
		// console.log(`totalCalcElapsed`, this.props.totalTime - this.props.restTime - this.state.totalTimer.ms);
	
		const remaining = this.props.totalTime - this.props.restTime - totalElapsed + 200;

		// console.log(`remaining`, remaining);
		
		totalTimer.ms = remaining;
		clearInterval(totalId);

		this.setState({ running: false })	
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

		const w = window.innerWidth
		const { completedIntervals, intervalMs, restMs, timeElapsed, totalTimer, active, timeRemaining } = this.state;
		const { msToText } = timeFuncs;

		// const can = this.createHiDPIcan(200, 200);

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
				<canvas
					
					className="run-timer__timer-circle"
					id="timer-circle"
					onClick={() => !this.state.running && this.state.totalTimer.ms > 0 ? this.runTimer() : this.stopTimer()}
				></canvas>
				<div className="run-timer__timer-data">
					<p className="run-timer__timer-data-label">Time Elapsed: {msToText(totalTime-timeRemaining-restTime)}</p>
					<p className="run-timer__timer-data-label">Time Remaining: {msToText(timeRemaining)}</p>
					<button className="run-timer__button run-timer__reset" onClick={() => this.resetTimers()}>Reset</button>
				</div>
			</div>
		)
	}
}

export default RunTimer;
