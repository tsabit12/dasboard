import { GET_TOP_REG } from "../types";

const intialState = {
	topReg: []
}

export default function grafik(state = intialState, action={}){
	switch(action.type){
		case GET_TOP_REG:
			return{
				...state,
				topReg: action.data
			}
		default: return state;
	}
}