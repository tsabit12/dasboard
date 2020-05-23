import { GET_JUMLAH_USER_QPOSIN } from "../types";

const initialState = {
	jmlData: {
		order: 0,
		user: 0,
		install: 0,
		uninstall: 0,
		update: 0
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
					update: action.data.updatesEvents
				}
			}
		default: return state;
	}
}