import { GET_AREA, GET_PKS, GET_PERIODE_PKS, GET_KINERJA_AC } from "../types";

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
	periodePks: [],
	kinerja: {
		searchParams: {
			reg: null,
			kprk: null,
			start: null,
			end: null
		},
		data: []
	}
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
		case GET_KINERJA_AC:
			return{
				...state,
				kinerja: {
					searchParams: {
						reg: action.payload.reg,
						kprk: action.payload.kprk,
						start: action.payload.startValue,
						end: action.payload.endValue
					},
					data: action.data
				}
			}
		default: return state;
	}
}