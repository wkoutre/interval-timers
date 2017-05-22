import React from 'react';
import PropTypes from 'prop-types';
import { camelCaseToWords } from '../../helpers/stringHelpers'
import base from '../Base'
// import * as audio from '../../audio/audio'
// import { timerComplete } from '../../audio/audio'
// import completeAudio from '../../audio/timer-complete.m4a'

class Settings extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timerComplete: "",
			rest: "",
			go: ""
		}
	}

	// componentWillMount() {
	// 	const audioFiles = [['timer-complete', 'timerComplete']];

	// 	audioFiles.forEach(file => this.getAudioFile(file[0], file[1]))
	// }

	// getAudioFile = (filename, stateProp) => {
	// 	const storage = base.storage();
	// 	const audioRef = storage.ref('audio')
	// 	const audioPathRef = storage.ref(`audio/${filename}.m4a`)
	// 	audioPathRef.getDownloadURL()
	// 		.then( url => {
	// 			const xhr = new XMLHttpRequest();
	// 			xhr.responseType = 'blob';
	// 			xhr.onLoad = event => { var blob = xhr.response} 

	// 			console.log(`URL`, url);

	// 			xhr.open('GET', url);
	// 			xhr.send();

	// 			// const el = document.getElementById(`${filename}`)
	// 			// console.log(`el`, el);
	// 			// el.src = url;

	// 			this.setState({ [stateProp]: url})
	// 		})
	// 	.catch(err => alert('Error: File not found'))
	// }

	render() {
		const { setDefaultRestTime, setDefaultIntervalTime, setDefaultRestIncrement, setDefaultNumIntervals, defaultRestTime, defaultIntervalTime, defaultNumIntervals, defaultRestIncrement } = this.props;
		const settings = [['Rest Time', 'seconds'], ['Interval Time', 'minutes'], 'Number of Intervals', ['Rest Increment', 'seconds'], 'Interval End Sound', 'Rest End Sound', 'Timer Complete Sound'];
		const settingValues = [ defaultRestTime, defaultIntervalTime, defaultNumIntervals, defaultRestIncrement ]
		const setters = [ setDefaultRestTime, setDefaultIntervalTime, setDefaultNumIntervals, setDefaultRestIncrement ];
		const settingChangers = settings.map( (setName, i) => {
			// change this once the sound features are implementedDefault

		const lower = !Array.isArray(setName) ?
			setName.split(' ').map(letter => letter.toLowerCase()).join('-') :
			setName[0].split(' ').map(letter => letter.toLowerCase()).join('-')

			if (i >= 4)
				return ;
			return (
					<div key={lower} className={`settings-div`}>
						<label className="settings-label" htmlFor={`settings-input-${lower}`}>{
							Array.isArray(setName) ? <span>{setName[0]} ({setName[1]}):</span> :
							<span>{setName}:</span>
							}
							</label>
						<input
							type="number"
							value={settingValues[i] || ""}
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
