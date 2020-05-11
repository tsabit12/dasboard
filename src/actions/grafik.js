import api from "../api";
import { GET_TOP_REG } from "../types";

export const getToReg = () => dispatch => 
	api.grafik.getToReg()
		.then(data => dispatch({
			type: GET_TOP_REG,
			data
		}))