import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import  rootReducer  from "./reducers/index";

import App from "./App";



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});




 const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(

    <Provider store={store}>

<App />

</Provider>

);

