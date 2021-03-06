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

export const getUserStatus = () => {
	return new Promise( (resolve, reject) => {
		base.auth().onAuthStateChanged( user => {
			if (user){
				const { uid } = user;
				resolve(uid);
			}
			else
				reject();
		})
	})
}

export const getUserStore = (uid) => {
	return new Promise( (resolve, reject) => {
		const userRef = base.database().ref(`/users/${uid}/`);
		userRef.once('value', snapshot => {
			const data = snapshot.val();
			const store = JSON.parse(data.store)
			
			if (store)			
				resolve(store);
			else
				reject('Error: No store returned from server')
		})
	})
}

export const syncingMiddleware = store => next => action => {

	getUserStatus()
		.then((uid) => {
			const state = store.getState();
			const shouldUpdate = (action.type === C.SET_INITIAL_STATE || state.app.loggedIn === true) && action.type !== C.LOGOUT && action.type !== C.SET_LOGIN;

			// console.groupCollapsed('syncingMiddleware');
			// 	console.log('state:', state);
			// 	console.log('id:', id);
			// 	console.log('loggedIn', loggedIn);
			// console.groupEnd('syncingMiddleware');	

			const update = () => {
				const stringified = JSON.stringify(store.getState());

				base.database().ref(`users/${uid}/store`).set(stringified)
				try {
					localStorage.setItem('workout-timer-app', stringified);	
				} catch(err) {
					console.error(`${err}:  Local storage doesn't exist`)
				}
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
