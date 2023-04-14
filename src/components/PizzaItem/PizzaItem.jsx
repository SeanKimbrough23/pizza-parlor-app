import { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function PizzaItem({ pizza }) {
  const [addedPizza, setAddedPizza] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    setAddedPizza(!addedPizza);
    if (addedPizza) {
      dispatch({ type: "REMOVE_FROM_CART", payload: pizza });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: pizza });
    }
  };
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardHeader title={pizza.name} />
      <CardMedia component="img" height="194" image={pizza.image_path} />
      <CardContent>
        <Typography variant="body2">{pizza.description}</Typography>
        <Typography> {pizza.price}</Typography>
        <Button onClick={handleClick}>{addedPizza ? "Remove" : "Add"} </Button>
      </CardContent>
    </Card>
  );
}

export default PizzaItem;
