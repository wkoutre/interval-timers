import base from '../components/Base'

const userRef = base.database().ref(`users/${localStorage['redux-timer-store']}`)

export const initialState = userRef.once('value')
	.then(snapshot => {
	let data = snapshot.val() || {};
	// console.log(data.length);
	
	if (data.store) {
		console.log('getStoreData:', JSON.parse(data.store));
			data = JSON.parse(data.store)
	}

		return data;
	})
	.catch(err => {
		console.error(err);
	})
