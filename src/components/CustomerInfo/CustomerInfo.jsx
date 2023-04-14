import React from "react";
import axios from "axios";
import withReactContent from "sweetalert2-react-content";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"; //
import { useDispatch } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2"; //importing library that helps create alerts/ prompts and dialogue
import InputFields from "../InputFields/InputFields";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  ButtonGroup,
} from "@mui/material";

function CustomerInfo() {
  const history = useHistory();
  const dispatch = useDispatch();
  const swal = withReactContent(Swal);

  //ability for user to go back to previous page
  const goToPreviousPage = () => {
    history.push("/");
  };

  const checkoutPage = () => {
    swal
      .fire({
        title: "Please review your order and get ready to checkout 🙌",
      })
      .then(() => {
        history.push("/checkout");
      });
  };

  // This code will display a message if all fields are filled in by the user
  const [displayMissingFieldsMessage, setMissingFieldsMessage] =
    useState(false);

  // const routeChange = () => {
  //   let path = "/checkout";
  //   history.push(path);
  // };

  // customer info object
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    street_address: "",
    city: "",
    zip: "",
    select: "",
  });

  const addInfo = (event) => {
    event.preventDefault();
    console.log("Adding customer information", customerInfo);
    // send data to store
    if (
      customerInfo.customer_name &&
      customerInfo.street_address &&
      customerInfo.city &&
      customerInfo.zip &&
      customerInfo.type
    ) {
      console.log("submit customer, customer is:", customerInfo);
      dispatch({ type: "SET_CUSTOMER", payload: customerInfo });
      checkoutPage();
    } else {
      setMissingFieldsMessage(true);
      setTimeout(() => {
        //will display message on screen if user takes to long
        setMissingFieldsMessage(false);
      }, 5000);
    }
  };
  const handleTypeChange = (event) => {
    setCustomerInfo({
      ...customerInfo,
      type: event.target.value,
    });
  };

  return (
    <>
      <h2>Customer Information</h2>
      <form id="Customer_Info_form" onSubmit={(event) => addInfo(event)}>
        <div id="Input-container">
          <InputFields
            setCustomerInfo={setCustomerInfo}
            customerInfo={customerInfo}
            inputName={"customer_name"}
            type={"Name"}
          />
          <InputFields
            setCustomerInfo={setCustomerInfo}
            customerInfo={customerInfo}
            inputName={"street_address"}
            type={"Address"}
          />
          <InputFields
            setCustomerInfo={setCustomerInfo}
            customerInfo={customerInfo}
            inputName={"city"}
            type={"City"}
          />
          <InputFields
            setCustomerInfo={setCustomerInfo}
            customerInfo={customerInfo}
            inputName={"zip"}
            type={"Zip Code"}
          />
        </div>

        <RadioGroup onChange={handleTypeChange}>
          <FormControlLabel value="pickup" control={<Radio />} label="Pickup" />
          <FormControlLabel
            value="delivery"
            control={<Radio />}
            label="Delivery"
          />
        </RadioGroup>
        <ButtonGroup id="button-group">
          <Button id="back-btn" onClick={goToPreviousPage}>
            BACK
          </Button>
          <Button id="next-btn" type="submit">
            NEXT
          </Button>
        </ButtonGroup>

        {displayMissingFieldsMessage && <p>Incomplete Information</p>}
      </form>
    </>
  );
}

export default CustomerInfo;
