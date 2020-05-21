import api from "../api";
import { GET_AREA } from "../types";

export const getRegional = () => dispatch => 
	api.report.getRegional()
		.then(data => dispatch({
			type: GET_AREA,
			data
		}))