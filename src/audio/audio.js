import base from '../components/Base'
import { addAudio } from '../actions'
import { store } from '../store/store'
import C from '../constants.js'

const setAudioFiles = () => {
	const audioFiles = ['timerComplete', 'go', 'rest'];

	audioFiles.forEach(file => getAudioFile(file))
};

const getAudioFile = (filename, action) => {
	if (store.getState().app.loggedIn) {
		const storage = base.storage();
	const audioRef = storage.ref('audio')
	const audioPathRef = storage.ref(`audio/${filename}.m4a`)
	const metadata = {
		contentType: 'audio/mpeg'
	}

	audioPathRef.updateMetadata(metadata)
	audioPathRef.getDownloadURL()
		.then( url => {
			const xhr = new XMLHttpRequest();
			xhr.responseType = 'blob';
			xhr.onLoad = event => { var blob = xhr.response} 

			console.log(`URL`, url);

			xhr.open('GET', url);
			xhr.send();

			// const el = document.getElementById(`${filename}`)
			// console.log(`el`, el);
			// el.src = url;

			store.dispatch({ 
				type: C.ADD_AUDIO,
				audioName: filename,
				url: url
			})
		})	
	}
}

export default setAudioFiles();
