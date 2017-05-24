import React from 'react';
import PropTypes from 'prop-types';
import * as colors from '../../css/colors'

class CompletedTimersCal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayMonth: new Date().getMonth(),
			months: 'January February March April May June July August September October November December'.split(' '),
			days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
			calendar: [],
			showingInfo: false,
			details: ""

		}
	}

	componentDidMount() {
		this.makeCalendar()
	}

	componentDidUpdate(nextProps) {
		if (nextProps.completedTimers.length !== this.props.completedTimers.length)
			this.makeCalendar();
	}

	makeCalendar = () => {
		const { months, days } = this.state;
		const { completedTimers } = this.props;
		const { calendar, displayMonth } = this.state;
		const monthName = this.state.months[displayMonth];
		let monthsObj = {};

		for (let m in months) {
			const mon = months[m]
			monthsObj[mon] = days[m]
		}

		const date = new Date(completedTimers[0].ms)
		console.log(`date`, date.getDate());
		
		const curMonthNum = new Date().getMonth();
		
		const calendarData = Object.keys(monthsObj).map(month => {
			const completed = completedTimers.filter(arr => arr.dateString.indexOf(month) !== -1);

			// array of completedTimers
			const days = monthsObj[month];
			const dayBoxes = [];
			for (let i = 1; i <= days; i++) {
				let bool = false;
				const dayCompleted = completed.filter(arr => {
					const date = new Date(arr.ms).getDate();
					if (date === i){
						bool = true;
						return arr;
					}
				})

				const innerText = bool ? <span onClick={() => this.showDetails(dayCompleted)} className="day-num-completed">&#10003;({dayCompleted.length})</span> : <span className="day-num">{i}</span>

				// if (dayCompleted.length > 9) {
				// 	console.log(`dayCompleted`, dayCompleted);
				// }
				if ( i < 31 ) {
					dayBoxes.push(<li key={`${month}-${i}`} className="month-obj__day-box">{innerText}</li>)
				}
				else {
					dayBoxes.push(<li key={`${month}-${i}`} className="month-obj__last-day-box">{i}</li>)
				}
			}

			return (
				<div key={month} className="month-div">
					<h1>{month}</h1>
						<select className="calendar__month-selector" onChange={(e) => this.changeMonth(e)} name="months" id="month">
						{this.state.months.map(mon => <option key={`${mon}-option`}  value={mon}>{mon}</option>)}
					</select>
					<ul className="month-obj">
						{dayBoxes}
					</ul>
				</div>
			)
		})

		this.setState({ calendar: calendarData })
	}

	showCalendar = () => {
		const showingInfo = false,
				details = ""

		this.setState({ showingInfo, details })
	}

	localRemoveTimer = (ms, e) => {
		const style = e.target.parentElement.style;

		style.opacity = 0.25
		style.backgroundColor = colors.red;
		this.props.removeCompletedTimer(ms)
	}

	showDetails = (completedObj) => {
		const showingInfo = true;
		const calDetails = (Object.keys(completedObj).map(i => {
			const obj = completedObj[i];
			
					return (
						<div key={`calendar-${obj.ms}`} className="calendar__day-details-item">
							<h3>{obj.dateString}</h3>
							<span className="calendar__day-details-timerName">{obj.timerName}</span>
							<span className="calendar__day-details-delete" onClick={(e) => this.localRemoveTimer(obj.ms, e)}>Remove</span>
						</div>
					)
				}))

		console.log(`calDetails`, calDetails);
		
		const details = (
			<div className="calendar__details">
				<span onClick={() => this.showCalendar()} className="calendar__details-close">Back to Calendar</span>
				{calDetails}
			</div>
		)

		this.setState({ details })

		setTimeout(() => this.setState({ showingInfo }), 100)

		console.log(`showing details`, completedObj);

	}

	changeMonth = (e) => {
		const val = e.target.value;
		const displayMonth = this.state.months.indexOf(val);
		
		this.showCalendar();
		this.setState({ displayMonth });
	}

	render() {

		const { calendar, displayMonth } = this.state;
		const monthName = this.state.months[displayMonth];

		return (
			<div className="calendar">
				{
					this.state.showingInfo ?
						this.state.details :
						calendar[displayMonth]
				}
				<br/>
				{
					!this.state.showingInfo && <p>Tap marked days to see info.<br/> Toggle month above.</p>
				}
			</div>
		)
	}
}

export default CompletedTimersCal;
