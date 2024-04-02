import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import Balance from "./Balance";
import Users from "./Users";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const getBalance = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/account/balance",
        config
      );

      setUserBalance(data.balance);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [userBalance, setUserBalance] = useState();

  useEffect(() => {
    getBalance();
  }, []);

  return (
    <div className="flex flex-col">
      <AppBar />

      <div className="flex flex-col gap-4  p-4">
        <Balance value={userBalance} />

        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
