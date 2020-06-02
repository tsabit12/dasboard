import api from "../api";
import { GET_TOP_AE, GET_MINUS_AE, GET_TOTAL_ROW_MINUS } from "../types";

export const getTopAe = (payload) => dispatch => 
	api.ae.getTop(payload)
		.then(res => dispatch({
			type: GET_TOP_AE,
			data: res.result,
			grafik: res.grafik,
			...payload
		}))

export const getMinus = (payload) => dispatch => 
	api.ae.getMinus(payload)
		.then(res => dispatch({
			type: GET_MINUS_AE,
			data: res,
			payload
		})) 

export const getTotalRow = (periode) => dispatch => 
	api.ae.getTotal(periode)
		.then(res => dispatch({
			type: GET_TOTAL_ROW_MINUS,
			total: res.total_row
		}))