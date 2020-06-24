import api from "../api";
import { GET_TOP_REG, GET_TOP_KPRK } from "../types";

export const getToReg = (param) => dispatch => 
	api.grafik.getToReg(param.payload)
		.then(data => dispatch({
			type: GET_TOP_REG,
			data,
			payload: param.search
		}))

export const getTopKrpk = (payload, param) => dispatch =>
	api.grafik.getTopKrpk(payload)
		.then(data => dispatch({
			type: GET_TOP_KPRK,
			data,
			param
		}))