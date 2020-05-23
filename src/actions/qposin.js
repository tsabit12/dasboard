import qposinApi from "../qposinApi";
import { GET_JUMLAH_USER_QPOSIN } from "../types";

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