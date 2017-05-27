import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToWords } from '../../helpers/stringHelpers'
import base from '../Base'
// import * as audio from '../../audio/audio'
// import { timerComplete } from '../../audio/audio'
// import completeAudio from '../../audio/timer-complete.m4a'

class Settings extends React.Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		timerComplete: "",
	// 		rest: "",
	// 		go: ""
	// 	}
	// }

	render() {
		const { setDefaultIntervalMins, setDefaultIntervalSecs, setDefaultRestMins, setDefaultRestSecs, setDefaultNumIntervals,  setDefaultRestIncrement, defaultRestMins, defaultRestSecs, defaultIntervalMins, defaultIntervalSecs, defaultNumIntervals, defaultRestIncrement } = this.props;
		const settings = ['Interval Minutes', 'Interval Seconds', 'Rest Minutes','Rest Seconds', 'Number of Intervals', 'Rest Increment', 'Interval End Sound', 'Rest End Sound', 'Timer Complete Sound'];
		const settingValues = [defaultIntervalMins, defaultIntervalSecs, defaultRestMins, defaultRestSecs, defaultNumIntervals, defaultRestIncrement ]
		const setters = [ setDefaultIntervalMins, setDefaultIntervalSecs, setDefaultRestMins, setDefaultRestSecs, setDefaultNumIntervals, setDefaultRestIncrement ];

		const settingChangers = settings.map( (setName, i) => {
			// change this once the sound features are implementedDefault

		const lower = setName.split(' ').map(letter => letter.toLowerCase()).join('-');

			if (i >= 6)
				return ;
			return (
					<div key={lower} className={`settings-div`}>
						<label className="settings-label" htmlFor={`settings-input-${lower}`}>
							<span>{setName}:</span>
							</label>
						<input
							type="number"
							value={settingValues[i] || ""}
							placeholder={setName}
							pattern="[0-9]*"
							name={`settings-input-${lower}`}
							className="settings-input"
							onChange={(e) => setters[i](e.target.value)}/>
					</div>
				)
		})

		return (
			<div className="app-settings">
				<h1 className="settings-heading">Changes take effect <span>immediately</span> upon input.</h1>
				{settingChangers}
			</div>
		)
	}
}


export default Settings;

// 1. Default rest time
 
// 2. Default interval time
 
// 3. Default interval length
 
// 4. Default rest increment
 
// 5. Default interval end sound
 
// 6. Default rest end sound
 
// 7. Default timer complete sound
