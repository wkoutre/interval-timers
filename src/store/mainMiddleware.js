import C from '../constants'
import _ from 'lodash'
import base from '../components/Base'

// const storeFromServer = store => next => action => {

// 	if (!store.getState().app.user.uid && localStorage['workout-timer-uid'] !== undefined) {
// 		const userRef = base.database().ref(`users/${localStorage['workout-timer-uid']}`);

// 		console.log('outside the promise');

// 		userRef.once('value')
// 			.then(snapshot => {
				
// 				const data = snapshot.val();
// 				const state = JSON.parse(data.store);				

// 				// store.state = 
// 				console.groupCollapsed('Setting initial state')
// 				console.info('oldState:', store.getState());
// 				console.info('state from server:', state);
// 				console.groupEnd('Setting initial state');

// 				setInitialState(state);
// 			})
// 			.catch(err => console.error(err))
// 	}

// 	return next(action);
// }

const getUserStatus = () => {
	return new Promise( (resolve, reject) => {
		base.auth().onAuthStateChanged( user => {
			// console.log(`user`, user);
			// console.log(`uid`, user.uid);
			if (user){
				const { uid } = user;
				resolve(uid);
			}
			else
				reject();
		})
	})
}

export const syncingMiddleware = store => next => action => {

	getUserStatus()
		.then((uid) => {
			console.log(`uid`, uid);
			const state = store.getState();
			
			const shouldUpdate = action.type === C.SET_INITIAL_STATE || state.app.loggedIn === true;

			// console.groupCollapsed('syncingMiddleware');
			// 	console.log('state:', state);
			// 	console.log('id:', id);
			// 	console.log('loggedIn', loggedIn);
			// console.groupEnd('syncingMiddleware');	

			const update = () => {
				const stringified = JSON.stringify(store.getState());

				base.database().ref(`users/${uid}/store`).set(stringified)
				localStorage.setItem('workout-timer-app', stringified);
			};

			// to sync with the current state, and not one step behind!
			if (shouldUpdate)
				setTimeout(update, 0);
			return next(action);
		})
		.catch( () => {
			console.error('Nobody logged in')
			return next(action);
		})
}
