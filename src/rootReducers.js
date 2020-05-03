import { combineReducers } from "redux";
import auth from "./reducers/auth";
import produk from "./reducers/produk";

export default combineReducers({
	auth,
	produk
})