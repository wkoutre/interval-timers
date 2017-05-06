import base from '../components/Base'
import { createStore, applyMiddleware } from 'redux'
import { setunsubscribeSyncId } from '../actions';
import mainReducer from './reducers'

const userRef = base.database().ref(`users/${localStorage['workout-timer-uid']}`)

export const getStoreData = () => userRef.once('value')
	.then(snapshot => {
	let data = snapshot.val() || {};
	
	if (data.store) {
		console.log('getStoreData:', JSON.parse(data.store));
			data = JSON.parse(data.store)
	}
		return data;
	})
	.catch(err => {
		console.error(err);
	})

// Function to reset store and it's state if page is refreshed

// export const setStoreOnRefresh = (mainReducer, middeware, composeEnhancers) => {
// 	const initialState = JSON.parse(localStorage['workout-timer-app']) || {};
// 	const uid = localStorage['workout-timer-uid'];
// }
