import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import "./index.css";
import App from "./components/App/App";

//Reducers:
const root = ReactDOM.createRoot(document.getElementById("root"));

const pizzas = (state = [], action) => {
  switch (action.type) {
    case "SET_PIZZAS":
      return action.payload;
  }
  return state;
};

// reducer for customer cart
const cart = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "REMOVE_FROM_CART":
      return state.filter((pizza) => {
        if (pizza != action.payload) {
          return pizza;
        }
      });
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};

const total = (state = 0, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      console.log(action.payload.price);
      return Math.round((state + Number(action.payload.price)) * 100) / 100;
    case "REMOVE_FROM_CART":
      console.log(action.payload.price);
      return Math.round((state - action.payload.price) * 100) / 100;
    case "CLEAR_TOTAL":
      state = 0;
      return state;
  }
  return state;
};

// Reducer for customer info form
const customer = (state = [], action) => {
  if (action.type === "SET_CUSTOMER") {
    return action.payload;
  }
  if (action.type === "CLEAR_CUSTOM") {
    state = [];
    return state;
  }
  return state;
};

const store = createStore(
  combineReducers({
    pizzas,
    cart,
    customer,
    total,
  }),
  applyMiddleware(logger)
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
