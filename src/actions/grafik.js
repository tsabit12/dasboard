import api from "../api";
import { GET_TOP_REG, GET_TOP_KPRK } from "../types";

export const getToReg = (payload) => dispatch => 
	api.grafik.getToReg(payload)
		.then(data => dispatch({
			type: GET_TOP_REG,
			data,
			payload
		}))

export const getTopKrpk = () => dispatch =>
	api.grafik.getTopKrpk()
		.then(data => dispatch({
			type: GET_TOP_KPRK,
			data
		}))