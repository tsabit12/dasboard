import { GET_TOP_PRODUK } from "../types";

const initialState = {
	data: [],
	searchParam: {}
}

export default function produk(state=initialState, action={}) {
	switch(action.type){
		case GET_TOP_PRODUK:
			return {
				data: action.products,
				searchParam: {
					start: action.payload.start,
					end: action.payload.end
				}
			}
		default: return state;
	}
}