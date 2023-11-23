import DetailsCard from "./DetailsCard";
import UserLoginChart from "./UserLoginChart";

export default function DashboardLayout() {
  return (
    <>
    <div className="px-8 py-7 pl-72 w-[100vw] overflow-hidden">
        <div>
            <h1 className="text-2xl font-semibold">Welcome to your Dashboard</h1>
            <h6 className="text-sm font-normal text-gray-600">This is where you will control all the details about your e-commerce store</h6>
        </div>
        <div className="flex gap-4 mt-10">
            <DetailsCard title="Total Sales" />
            <DetailsCard  title="Total Products" />
            <DetailsCard  title="Total Users" />

        </div>
    <div className="flex gap-4 mt-10">
      <UserLoginChart />
      </div>
    </div>
    </>
  ); 
}
