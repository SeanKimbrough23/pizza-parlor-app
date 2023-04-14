import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import "../PizzaList/PizzaList.css";
import PizzaItem from "../PizzaItem/PizzaItem";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function PizzaList() {
  console.log("PizzaList is running");
  const history = useHistory();
  const pizzas = useSelector((store) => store.pizzas);
  const swal = withReactContent(Swal);

  const nextPage = () => {
    swal
      .fire({
        title: "Fill Out Information on Next Page",
      })
      .then(() => {
        history.push("/CustomerInfo");
      });
  };

  return (
    <>
      <div className="pizza-list">
        {pizzas.map((pizza) => {
          return <PizzaItem key={pizza.id} pizza={pizza} />;
        })}

        <Button className="form-btn" onClick={nextPage} type="submit">
          Next{" "}
        </Button>
      </div>
    </>
  );
}
export default PizzaList;
