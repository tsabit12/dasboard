import { GET_TOP_REG, GET_TOP_KPRK } from "../types";

const intialState = {
	topReg: [],
	topKprk: [],
	searchReg: '',
	searchKprk: {}
}

export default function grafik(state = intialState, action={}){
	switch(action.type){
		case GET_TOP_REG:
			return{
				...state,
				topReg: action.data,
				searchReg: `${action.payload.year}-${action.payload.month}`
			}
		case GET_TOP_KPRK:
			return{
				...state,
				topKprk: action.data,
				searchKprk: {
					start: action.param.start,
					end: action.param.end
				}
			}
		default: return state;
	}
}