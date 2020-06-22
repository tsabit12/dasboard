import api from "../api";
import { GET_TOP_PRODUK } from "../types";

export const getTopProduk = (payload) => dispatch => 
	api.grafik.getProduk(payload)
		.then(res => dispatch({
			type: GET_TOP_PRODUK,
			products: res,
			payload
		}));