import api from "../api";
import { GET_TOP_AE } from "../types";

export const getTopAe = () => dispatch => 
	api.ae.getTop()
		.then(res => dispatch({
			type: GET_TOP_AE,
			data: res.result,
			grafik: res.grafik
		}))