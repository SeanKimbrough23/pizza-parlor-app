import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, TableRow, TableCell } from "@mui/material";

function OrderItem({ order, getOrders }) {
  const pizzas = useSelector((store) => store.pizzas);
  const [details, setDetails] = useState(false);
  const [pizzaNames, setPizzaNames] = useState([]);

  useEffect(() => {
    const getPizzaNames = async () => {
      const pizzaNames = await Promise.all(
        order.map(async (order) => {
          const response = await axios.get(`/api/pizza/${order.pizza_id}`);
          return response.data.name;
        })
      );
      setPizzaNames(pizzaNames);
    };

    getPizzaNames();
  }, [order]);

  const deleteOrder = () => {
    axios
      .delete(`/api/order/${order.id}`)
      .then((response) => {
        getOrders();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = () => {
    deleteOrder();
  };

  const displayDetails = () => {
    setDetails(!details);
  };

  return (
    <>
      <TableRow onClick={displayDetails}>
        <TableCell>{order.customer_name}</TableCell>
        <TableCell>{new Date(order.time).toLocaleString()}</TableCell>
        <TableCell>{order.type}</TableCell>
        <TableCell>{order.total}</TableCell>
      </TableRow>
      {details && (
        <TableRow>
          <TableCell>
            <ul>
              {pizzaNames.map((pizzaName, index) => (
                <li key={index}>{pizzaName}</li>
              ))}
            </ul>
          </TableCell>
          <TableCell colSpan={2}>
            {`${order.street_address}, ${order.city}, ${order.zip}`}
          </TableCell>
          <TableCell>
            <Button onClick={handleDelete}>Remove</Button>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

export default OrderItem;
