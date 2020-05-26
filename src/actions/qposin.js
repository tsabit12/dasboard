import qposinApi from "../qposinApi";
import { GET_JUMLAH_USER_QPOSIN, GET_USER_BY_CITY, GET_GRAPIK_ORDER, GET_REPORT_PRODUK } from "../types";

export const getUser = (payload) => dispatch => 
	qposinApi.getUser(payload)
		.then(res => console.log(res))
		.catch(err => console.log(err.request))

export const getJml = () => dispatch => 
	qposinApi.getJumlah()
		.then(data => dispatch({
			type: GET_JUMLAH_USER_QPOSIN,
			data
		}))

export const getUserCity = () => dispatch =>
	qposinApi.getUserCity()
		.then(data => dispatch({
			type: GET_USER_BY_CITY,
			data
		}))

export const reportPerWeek = () => dispatch =>
	qposinApi.reportPerWeek()
		.then(data => dispatch({
			type: GET_GRAPIK_ORDER,
			data
		}))

export const getReportProduk = () => dispatch =>
	qposinApi.getReportProduk()
		.then(data => dispatch({
			type: GET_REPORT_PRODUK,
			data
		}))