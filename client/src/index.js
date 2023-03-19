import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import {store }from "./app/store";
import App from "./App";

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <Provider store={store}>
    <App />
  </Provider>
);