import { combineReducers } from "redux";
import auth from "./reducers/auth";
import produk from "./reducers/produk";
import grafik from "./reducers/grafik";
import ae from "./reducers/ae";

export default combineReducers({
	auth,
	produk,
	grafik,
	ae
})