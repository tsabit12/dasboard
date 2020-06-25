import api from "../api";
import { GET_TOP_AE, GET_MINUS_AE, GET_TOTAL_ROW_MINUS } from "../types";

export const getTopAe = (payload, start, end) => dispatch => 
	api.ae.getTop(payload)
		.then(res => dispatch({
			type: GET_TOP_AE,
			data: res.result,
			grafik: res.grafik,
			startDate: start,
			endDate: end
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