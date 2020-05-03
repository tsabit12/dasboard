import { GET_TOP_PRODUK } from "../types";

export default function produk(state=[], action={}) {
	switch(action.type){
		case GET_TOP_PRODUK:
			return action.products
		default: return state;
	}
}