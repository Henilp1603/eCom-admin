import React from "react";
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
  Title,
} from "@tremor/react";
import {Delete, PenIcon, Trash, WifiIcon} from "lucide-react";
import {useOrderContext} from "../Context/OrderContext";
import moment from "moment/moment";

function DeleteIcon() {
  return (
    <div>
      <Trash className="w-4 h-4" />
    </div>
  );
}

const Orders = () => {
  const {orders} = useOrderContext();
  return (
    <div className="px-8 py-7 pl-72 w-[100vw] overflow-hidden">
      <div>
        <h1 className="text-2xl font-semibold">Manage Users</h1>
        <h6 className="text-sm font-normal text-gray-600">
          This is where you will manage all Users
        </h6>
      </div>
      <div className="mt-10">
        <Card className="">
          <Title>All Orders</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Customer Name</TableHeaderCell>
                <TableHeaderCell>Products</TableHeaderCell>
                <TableHeaderCell>Date & Time</TableHeaderCell>
                <TableHeaderCell>Total Ammount</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.orderby?.name}</TableCell>
                  <TableCell className="text-start p-0">
                    <TableRow>
                      <TableHeaderCell>Product Name</TableHeaderCell>
                      <TableHeaderCell>Quantity</TableHeaderCell>
                    </TableRow>

                    {item.products.map((pr) => (
                      <TableRow>
                        <TableCell>{pr?.product.title}</TableCell>
                        <TableCell>{pr?.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Text>
                      {moment(item.dateOrdered).format("MMMM Do YYYY,h:mm a")}
                    </Text>
                  </TableCell>
                  <TableCell>
                    <Text>{item.totalPrice}</Text>
                  </TableCell>
                  <TableCell>
                    <Button
                      icon={DeleteIcon}
                      variant="light"
                      color="red"
                      iconPosition="left"
                      className="flex items-center justify-between gap-2 w-max"
                    >
                      Delete User
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Orders;
