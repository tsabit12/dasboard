import api from "../api";
import { GET_TOP_PRODUK } from "../types";

export const getTopProduk = () => dispatch => 
	api.grafik.getProduk()
		.then(res => dispatch({
			type: GET_TOP_PRODUK,
			products: res
		}));