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

	// console.log("State after:", store.getState());
	

	return next(action);
}

export const checkLoginMiddleware = store => next => action => {
	if (!store.getState().app.loggedIn && history.location.pathname !== '/') {
		history.push('/');
	}

	return next(action);
}

export const syncingMiddleware = store => next => action => {
	const id = localStorage['workout-timer-uid'];
	if (id !== undefined) {
		console.log('middleware takeover');
		console.log('ID:', id);
		
		const stringified = JSON.stringify(store.getState());
		base.database().ref(`users/${id}/store`).set(stringified)
		localStorage.setItem('workout-timer-app', stringified);
	}

	return next(action);	
}
