import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./combineAllReducers";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["authReducer"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
