import { combineReducers } from "redux";
import auth from "./reducers/auth";
import produk from "./reducers/produk";
import grafik from "./reducers/grafik";

export default combineReducers({
	auth,
	produk,
	grafik
})