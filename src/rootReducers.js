import { combineReducers } from "redux";
import auth from "./reducers/auth";
import produk from "./reducers/produk";
import grafik from "./reducers/grafik";
import ae from "./reducers/ae";
import report from "./reducers/report";
import qposin from "./reducers/qposin";

export default combineReducers({
	auth,
	produk,
	grafik,
	ae,
	report,
	qposin
})