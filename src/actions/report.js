import api from "../api";
import { GET_AREA, GET_PKS, GET_PERIODE_PKS, GET_KINERJA_AC } from "../types";

export const getRegional = () => dispatch => 
	api.report.getRegional()
		.then(data => dispatch({
			type: GET_AREA,
			data
		}))


export const getPks = (payload) => dispatch =>
	api.report.getPks(payload)
		.then(data => dispatch({
			type: GET_PKS,
			data,
			searchParams: payload
		}))

export const getPeriodepks = () => dispatch =>
	api.report.getPeriodePks()
		.then(data => dispatch({
			type: GET_PERIODE_PKS,
			data
		}))

export const getKinerja = (payload) => dispatch =>
	api.report.getKinerja(payload)
		.then(data => dispatch({
			type: GET_KINERJA_AC,
			data,
			payload
		}))