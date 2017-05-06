import base from '../components/Base'
import { createStore, applyMiddleware } from 'redux'
import { setunsubscribeSyncId } from '../actions';
import mainReducer from './reducers'

export const getStoreData = async () => {
	const userRef = base.database().ref(`users/${localStorage['workout-timer-uid']}`);

	const snapshot = await userRef.once('value');
	const response = snapshot.val();

	return await JSON.parse(response.store)

	// console.log("SNAP:", typeof snapshot);
	console.log("RESPONSE:", response);
	
}
	
// 		.then(async snapshot => {
// 			const response = snapshot.val();	

// 			if (response.store) {
// 				// console.log('getStoreData:', JSON.parse(response.store));
// 				// const data = JSON.parse(response.store)

// 				return await JSON.parse(response.store)
// 			} else {
// 				throw new Error('Error');
// 			}
// 		})
// 	.then(async data => await data)
// };

// Function to reset store and it's state if page is refreshed

// export const setStoreOnRefresh = (mainReducer, middeware, composeEnhancers) => {
// 	const initialState = JSON.parse(localStorage['workout-timer-app']) || {};
// 	const uid = localStorage['workout-timer-uid'];
// }

// module.exports = {
// 	getStoreData
// }
