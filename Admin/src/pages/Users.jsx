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
import {useUserContext} from "../Context/UserContext";
import { Link } from "react-router-dom";

const data = [
  {
    name: "Yash Gaurav",
    phone: "6351259205",
    address: "355, Mansarovar Society, Dindoli, Surat",
    orders: ["Resin", "Epoxy"],
  },
  {
    name: "Yash Gaurav",
    phone: "6351259205",
    address: "355, Mansarovar Society, Dindoli, Surat",
    orders: ["Resin", "Epoxy"],
  },
  {
    name: "Yash Gaurav",
    phone: "6351259205",
    address: "355, Mansarovar Society, Dindoli, Surat",
    orders: ["Resin", "Epoxy"],
  },
  {
    name: "Yash Gaurav",
    phone: "6351259205",
    address: "355, Mansarovar Society, Dindoli, Surat",
    orders: ["Resin", "Epoxy"],
  },
  {
    name: "Yash Gaurav",
    phone: "6351259205",
    address: "355, Mansarovar Society, Dindoli, Surat",
    orders: ["Resin", "Epoxy"],
  },
];

function DeleteIcon() {
  return (
    <div>
      <Trash className="w-4 h-4" />
    </div>
  );
}

export default function Users() {
  const {users, removeUser} = useUserContext();
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
          <Title>All Users</Title>
          <Table className="mt-5">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Full Name</TableHeaderCell>
                <TableHeaderCell>Phone No.</TableHeaderCell>
                <TableHeaderCell>Address</TableHeaderCell>
                <TableHeaderCell>Order History</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <Text>6351259205</Text>
                  </TableCell>
                  <TableCell>
                    <Text>355, Mansarovar Society, Dindoli, Surat</Text>
                  </TableCell>
                  <TableCell>
                    <Link to={`/user-order/${item._id}`}><Button variant="light">
                      Click here for order history
                    </Button></Link>
                  </TableCell>
                  <TableCell>
                    <Button
                      icon={DeleteIcon}
                      variant="light"
                      color="red"
                      iconPosition="left"
                      className="flex items-center justify-between gap-2 w-max"
                      onClick={() => removeUser(item._id)}
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
}
