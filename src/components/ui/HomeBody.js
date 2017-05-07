import React from 'react';
import PropTypes from 'prop-types';
import base from '../Base'

const HomeBody = (props) => {
	const storage = base.storage();
	const ref = storage.ref()
	const message = "Bahahahaha";

	const handleFileUpload = (file) => {
	  console.log(file.target);
	  
	  
	  // this.props.actions.uploadRequest({
	  //    file,
	  //    name: 'Awesome Cat Pic'
	  // })
}
	

	// ref.child('strings/secondString').putString(message).then((snapshot) => {
 //  	console.log('Uploaded a raw string!');
	// });

	return (
		<div>
			<h1>DASHBOARD</h1>
			<div>
				<span className="today-workout">Today's workout: ____</span>
			</div>
			<div className="progress-bars">
				<p className="progress">Progress 1</p>
				<p className="progress">Progress 2</p>
				<p className="progress">Progress 3</p>
				<p className="progress">Progress 4</p>
				<input 	type="file"
								accept="image/*"
								onChange={handleFileUpload}/>

			</div>
		</div>
	)
}

export default HomeBody;
