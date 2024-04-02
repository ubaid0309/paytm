import { useEffect, useState } from "react";
import InputBox from "./InputBox";
import { toast } from "react-toastify";
import axios from "axios";
import UserCard from "./UserCard";

const Users = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")),
    },
  };

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/user/bulk?filter=${filter}`,
        config
      );

      setUsers(data);
      console.log(users);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const [filter, setFilter] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, [filter]);

  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold text-lg">Users</p>

      <InputBox
        placeholder={"Search users..."}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="flex flex-col gap-1">
        {users.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
      </div>
    </div>
  );
};

export default Users;
