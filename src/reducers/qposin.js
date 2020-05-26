import { GET_JUMLAH_USER_QPOSIN, GET_USER_BY_CITY, GET_GRAPIK_ORDER, GET_REPORT_PRODUK } from "../types";

const initialState = {
	jmlData: {
		order: 0,
		user: 0,
		install: 0,
		uninstall: 0,
		mobile: 0
	},
	city: [],
	grafik: {
		order: [],
		produk: []
	}
}

export default function qposin(state=initialState, action={}){
	switch(action.type){
		case GET_JUMLAH_USER_QPOSIN:
			return{
				...state,
				jmlData: {
					order: action.data.jmlorder,
					user: action.data.jmluser,
					install: action.data.installEvents,
					uninstall: action.data.uninstallEvents,
					mobile: action.data.updatesEvents
				}
			}
		case GET_USER_BY_CITY:
			return{
				...state,
				city: action.data
			}
		case GET_GRAPIK_ORDER:
			return{
				...state,
				grafik: {
					...state.grafik,
					order: action.data
				}
			}
		case GET_REPORT_PRODUK:
			return{
				...state,
				grafik: {
					...state.grafik,
					produk: action.data
				}
			}
		default: return state;
	}
}