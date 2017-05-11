import React from 'react'
import { render } from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { store } from './store/store'

import App from './components/containers/ConApp'
import './css/bootstrap/css/bootstrap.min.css'
import './css/bootstrap-social/bootstrap-social.css'
import './css/style.css'
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
// import './css/font-awesome/css/font-awesome.min.css'


// console.log(`FB`, FB);


// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '922202227920127',
//       xfbml      : true,
//       version    : 'v2.9',
//       oauth			 : true
//     });
//     FB.AppEvents.logPageView();
//     FB.getLoginStatus();
// 		const token = FB.getAccessToken();
// 		console.log(`token`, token);
//   };

  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "//connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));

render(
		<Provider store={store}>
			<App />	
		</Provider>,	
		document.getElementById('root')
	)
