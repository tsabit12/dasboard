import { GET_TOP_AE, GET_MINUS_AE, GET_TOTAL_ROW_MINUS } from "../types";

const initialStae = {
	top: [],
	grafikTop: [],
	minus: {
		offset: null,
		limit: null,
		data: {},
		totalRow: 0
	},
	searchParamTop: {}
}

export default function ae(state=initialStae, action={}) {
	switch(action.type){
		case GET_TOP_AE:
			return{
				...state,
				top: action.data,
				grafikTop: action.grafik,
				searchParamTop: {
					start: action.startDate,
					end: action.endDate
				}
			}
		case GET_MINUS_AE:
			return{
				...state,
				minus: {
					...state.minus,
					offset: action.payload.offset,
					limit: action.payload.limit,
					data: {
						...state.minus.data,
						[action.payload.offset] : action.data
					}
				}
			}
		case GET_TOTAL_ROW_MINUS: {
			return{
				...state,
				minus: {
					...state.minus,
					totalRow: action.total
				}
			}
		}
		default: return state;
	}
}