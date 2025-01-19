import React from "react";
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App";
import "./index.css";
import store, { persistor } from "./store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
    <ToastContainer theme="colored" />
  </React.StrictMode>
);
