import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Admin from "../Admin/Admin";
import Checkout from "../Checkout/Checkout";
import CustomerInfo from "../CustomerInfo/CustomerInfo.jsx";
import PizzaList from "../PizzaList/PizzaList.jsx";

const App = () => {
  const dispatch = useDispatch();
  const [pizzaList, setPizzaList] = useState([]);

  const cart = useSelector((store) => store.cart);

  const fetchPizza = async () => {
    console.log("Fetching pizzas!");
    try {
      const response = await axios.get("/api/pizza");
      dispatch({
        type: "SET_PIZZAS",
        payload: response.data,
      });
    } catch (error) {
      console.log("Error fetching pizzas: ", error);
    }
  };

  useEffect(() => {
    fetchPizza();
  }, []);

  return (
    <div className="App">
      <div>
        <header>Sean's ZaZa Shop</header>
      </div>
      <Router>
        <div>
          <Route exact path="/" component={PizzaList} />
          <Route exact path="/CustomerInfo" component={CustomerInfo} />
          <Route exact path="/Checkout" component={Checkout} />
          <Route exact path="/order" component={Admin} />
        </div>
      </Router>
    </div>
  );
};

export default App;
