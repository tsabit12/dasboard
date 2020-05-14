import { GET_TOP_AE } from "../types";

const initialStae = {
	top: [],
	grafikTop: []
}

export default function ae(state=initialStae, action={}) {
	switch(action.type){
		case GET_TOP_AE:
			return{
				...state,
				top: action.data,
				grafikTop: action.grafik
			}
		default: return state;
	}
}