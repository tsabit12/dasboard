import { GET_TOP_REG, GET_TOP_KPRK } from "../types";

const intialState = {
	topReg: [],
	topKprk: []
}

export default function grafik(state = intialState, action={}){
	switch(action.type){
		case GET_TOP_REG:
			return{
				...state,
				topReg: action.data
			}
		case GET_TOP_KPRK:
			return{
				...state,
				topKprk: action.data
			}
		default: return state;
	}
}