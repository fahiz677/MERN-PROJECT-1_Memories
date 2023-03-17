import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import postsReducer from './reducers/posts';

import App from "./App";




const middleware = [...getDefaultMiddleware()];

const store = configureStore({

  reducer: {

    posts: postsReducer

  },

  middleware

});




 const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(

    <Provider store={store}>

<App />

</Provider>

);

