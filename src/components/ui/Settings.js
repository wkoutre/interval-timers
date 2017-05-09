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
		if (i >= 4)
			return ;
		return (
				<div key={setName} className={`setting-${setName}`}>
					<label htmlFor={`setting-input-${setName}`}>Default {setName}:</label>
					<input
						type="number"
						value={settingValues[i] || ""}
						name={`setting-input-${setName}`}
						onChange={(e) => setters[i](e.target.value)}/>
				</div>
			)
	});

	return (
		<div>
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