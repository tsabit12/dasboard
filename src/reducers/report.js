import { GET_AREA, GET_PKS, GET_PERIODE_PKS } from "../types";

const initialState = {
	area: [],
	pks: {
		searchParams: {
			reg: null,
			kprk: null,
			jenis: null,
			periode: null
		},
		data: []
	},
	periodePks: []
}

export default function report(state=initialState, action={}) {
	switch(action.type){
		case GET_AREA:
			return{
				...state,
				area: action.data
			}
		case GET_PKS:
			return{
				...state,
				pks: {
					searchParams: action.searchParams,
					data: action.data
				}
			}
		case GET_PERIODE_PKS:
			return{
				...state,
				periodePks: action.data
			}
		default: return state;
	}
}