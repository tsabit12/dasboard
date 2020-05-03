import api from "../api";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
})
export const loggedIn = payload => dispatch => 
	api.user.login(payload)
		.then(user => {
			localStorage.dashboardSales = user.token;
			dispatch(userLoggedIn(user))
		})

export const userLoggedOut = () => ({
	type: USER_LOGGED_OUT
})

export const loggedout = () => dispatch => {
	localStorage.removeItem('dashboardSales');
	dispatch(userLoggedOut());
};