import C from '../constants'
import _ from 'lodash'

const storeFromServer = store => next => action => {

	if (!store.getState().app.user.uid && localStorage['workout-timer-uid'] !== undefined) {
		const userRef = base.database().ref(`users/${localStorage['workout-timer-uid']}`);

		console.log('outside the promise');

		userRef.once('value')
			.then(snapshot => {
				
				const data = snapshot.val();
				const state = JSON.parse(data.store);				

				// store.state = 
				console.groupCollapsed('Setting initial state')
				console.info('oldState:', store.getState());
				console.info('state from server:', state);
				console.groupEnd('Setting initial state');

				setInitialState(state);
			})
			.catch(err => console.error(err))
	}

	return next(action);
}

export const checkLoginMiddleware = store => next => action => {
	if (!store.getState().app.loggedIn && history.location.pathname !== '/') {
		history.push('/');
	}

	return next(action);
}

export const syncingMiddleware = store => next => action => {


	const state = store.getState();
	const id = state.app.user.details.uid;
	const loggedIn = action.type === C.SET_INITIAL_STATE || state.app.loggedIn === true;

	// console.groupCollapsed('syncingMiddleware');
	// 	console.log('state:', state);
	// 	console.log('id:', id);
	// 	console.log('loggedIn', loggedIn);
	// console.groupEnd('syncingMiddleware');	

	const update = () => {
		const stringified = JSON.stringify(store.getState());
		base.database().ref(`users/${id}/store`).set(stringified)
		localStorage.setItem('workout-timer-app', stringified);
	};

	// to sync with the current state, and not one step behind!
	if (loggedIn && action.type !== C.LOGOUT && id && id !== 'undefined') {
		setTimeout(update, 0);
	}

	return next(action);
}
