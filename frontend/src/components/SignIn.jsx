import { useState } from "react";
import BottomWarning from "./BottomWarning";
import Button from "./Button";
import FormHeading from "./FormHeading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warn("Please fill all the required fields");
      return;
    }

    const body = {
      username: email,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/signin",
        body,
        config
      );
      console.log(data);
      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-slate-300">
      <div className="flex flex-col gap-1 text-center p-2 px-4 bg-white rounded-md">
        <FormHeading label={"Sign In"} />
        <SubHeading label={"Enter your information to sign in"} />

        <form onSubmit={submitHandler}>
          <InputBox
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            label={"Password"}
            placeholder={"john@123"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label={"Sign In"} />
          <BottomWarning
            label={"New here ? "}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
