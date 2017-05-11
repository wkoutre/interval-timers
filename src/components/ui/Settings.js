import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToWords } from '../../helpers/stringHelpers'


export const Settings = (props) => {
	const { setDefaultRestTime, setDefaultIntervalTime, setDefaultRestIncrement, setDefaultNumIntervals, defaultRestTime, defaultIntervalTime, defaultNumIntervals, defaultRestIncrement } = props;

	const settings = ['Rest Time', 'Interval Time', 'Number of Intervals', 'Rest Increment', 'Interval End Sound', 'Rest End Sound', 'Timer Complete Sound'];

	const settingValues = [ defaultRestTime, defaultIntervalTime, defaultNumIntervals, defaultRestIncrement ]

	const setters = [ setDefaultRestTime, setDefaultIntervalTime, setDefaultNumIntervals, setDefaultRestIncrement ];

	const settingChangers = settings.map( (setName, i) => {
		// change this once the sound features are implementedDefault
		const lower = setName.split(' ').map(letter => letter.toLowerCase()).join('-');

		if (i >= 4)
			return ;
		return (
				<div key={lower} className={`settings-div`}>
					<label className="settings-label" htmlFor={`settings-input-${lower}`}>Default {setName}:</label>
					<input
						type="number"
						value={settingValues[i] || ""}
						name={`settings-input-${lower}`}
						className="settings-input"
						onChange={(e) => setters[i](e.target.value)}/>
				</div>
			)
	});

	return (
		<div className="app-settings">
			<p className="settings-description">Changes take effect immediately upon input.</p>
			{settingChangers}
		</div>
	)
}

export default Settings;

// 1. Default rest time
 
// 2. Default interval time
 
// 3. Default interval length
 
// 4. Default rest increment
 
// 5. Default interval end sound
 
// 6. Default rest end sound
 
// 7. Default timer complete sound
