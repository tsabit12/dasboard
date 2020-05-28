// import React from 'react';
// import ReactDOM from 'react-dom';

// import * as serviceWorker from './serviceWorker';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { HashRouter, Route } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./rootReducers"; 

import decode from "jwt-decode";
import { userLoggedIn } from "./actions/auth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const store = createStore(
	rootReducers,
	composeWithDevTools(applyMiddleware(thunk))
);

if (localStorage.dashboardSales) {
	const payload 	= decode(localStorage.dashboardSales);
	const user 		= {
		...payload,
		token: localStorage.dashboardSales
	}

	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  	<HashRouter>
		<Provider store={store}>
			<Route component={App} /> 
		</Provider>
	</HashRouter>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
