import axios from "axios";
import "../Checkout/Checkout.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; //
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

function Checkout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const swal = withReactContent(Swal);
  const order = useSelector((state) => state.cart);
  const customer = useSelector((state) => state.customer);
  const total = useSelector((state) => state.total);

  const goToPreviousPage = () => {
    history.push("/CustomerInfo");
  };

  const handleCheckoutBtn = () => {
    const postPizzaOrders = {
      ...order,
      ...customer,
      total,
      pizzas: order.map((pizza) => {
        pizza.quantity = 1;
        return pizza;
      }),
    };

    axios
      .post("/api/order", postPizzaOrders)
      .then((response) => {
        dispatch({ type: "CLEAR_CART" });
        dispatch({ type: "CLEAR_TOTAL" });
        dispatch({ type: "CLEAR_CUSTOM" });
        swal
          .fire({
            title: "Order placed it will be ready shortly",
          })
          .then(() => {
            history.push("/");
          });
      })
      .catch((error) => {
        console.log("error posting to database");
      });
  };

  return (
    <>
      <div>
        <h2>Step 3: Checkout</h2>
        <div className="order-type">
          <p>{customer.type}</p>
        </div>
        <div className="customer-info">
          <p>{customer.customer_name}</p>
          <p>{customer.street_address}</p>
          <p>{customer.city}</p>
          <p>{customer.zip}</p>
        </div>
        <div className="checkoutOrder">
          <Table
            sx={{ maxWidth: 700 }}
            aria-label="simple table"
            align="center"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Pizza Name</TableCell>
                <TableCell align="right">Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order &&
                order.map((pizza, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {pizza.name}
                    </TableCell>
                    <TableCell align="right">{pizza.price}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

          <Button id="back-btn" onClick={goToPreviousPage}>
            BACK
          </Button>
          <Button id="checkout-btn" onClick={handleCheckoutBtn}>
            CHECKOUT
          </Button>

          <h3>Order Total: {total}</h3>
        </div>
      </div>
    </>
  );
}
export default Checkout;
