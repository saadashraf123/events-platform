import { combineReducers } from "redux";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    authReducer: authSlice,
});

export default rootReducer;
