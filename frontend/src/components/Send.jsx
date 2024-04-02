import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import InputBox from "./InputBox";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Send = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const config = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    },
  };

  const transferMoney = async () => {
    try {
      const { data } = axios.post(
        "http://localhost:5000/api/v1/account/transfer",
        {
          to: id,
          amount: amount,
        },
        config
      );

      toast.success(`${amount} transferred successfully`);
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <div className="flex flex-col gap-2 rounded-lg money-card  py-6 min-w-[40%] p-4">
        <p
          className="text-center text-2xl
         font-semibold"
        >
          Send Money
        </p>

        <div className="flex flex-col gap-2 text-lg mt-6 min-w-[90%] mx-auto">
          <div className=" flex gap-2 text-2xl">
            <p className=" text-white bg-green-600 rounded-full px-2">
              {name[0].toUpperCase()}
            </p>
            <p className="  font-semibold">{name}</p>
          </div>

          <p>Amout (in Rs)</p>

          <InputBox
            placeholder={"Enter amount"}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={transferMoney}
            className="bg-green-600  rounded-md w-full p-2 text-white"
          >
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default Send;
