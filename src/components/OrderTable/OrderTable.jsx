import OrderItem from "../OrderItem/OrderItem";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";

function OrderTable({ orders, getOrders }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Time </TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => {
          return (
            <OrderItem key={order.id} order={order} getOrders={getOrders} />
          );
        })}
      </TableBody>
    </Table>
  );
}

export default OrderTable;
