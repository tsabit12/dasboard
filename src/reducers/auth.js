import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";

const initialState = {
	user: {}
}

export default function auth(state=initialState, action={}) {
	switch(action.type){
		case USER_LOGGED_IN:
			return{
				...state,
				user: action.user
			}
		case USER_LOGGED_OUT:
			return{
				...state,
				user: {}
			}
		default: return state;
	}
}