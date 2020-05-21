import { GET_AREA } from "../types";

const initialState = {
	area: []
}

export default function report(state=initialState, action={}) {
	switch(action.type){
		case GET_AREA:
			return{
				...state,
				area: action.data
			}
		default: return state;
	}
}