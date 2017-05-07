import Rebase from 're-base';

const base = Rebase.createClass({
		apiKey: "AIzaSyD89g82pY3lPwzcS7Xlww1iQ2tzDFkWCeE",
    authDomain: "workout-app-5c1d4.firebaseapp.com",
    databaseURL: "https://workout-app-5c1d4.firebaseio.com",
    storageBucket: "workout-app-5c1d4.appspot.com"
});

const storage = base.storage();
console.log('storage', storage);
let ref = storage.ref();
console.log('ref', ref);

export default base;
