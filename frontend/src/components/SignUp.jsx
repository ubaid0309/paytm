import Button from "./Button";
import FormHeading from "./FormHeading";
import InputBox from "./InputBox";
import SubHeading from "./SubHeading";
import BottomWarning from "./BottomWarning";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    console.log("first");
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.warn("Please fill all the required fields");
      return;
    }

    const body = {
      username: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        body,
        config
      );

      localStorage.setItem("token", JSON.stringify(data.token));
      navigate("/dashboard");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <div className="bg-slate-300 h-screen w-screen flex justify-center items-center">
      <div className="flex flex-col gap-1 text-center p-2 px-4 bg-white rounded-md">
        <form onSubmit={submitHandler}>
          <FormHeading label={"Sign Up"} />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox
            label={"First Name"}
            placeholder={"John"}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label={"Last Name"}
            placeholder={"Doe"}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <Button label={"Sign Up"} />
          <BottomWarning
            label={"Already have an account ? "}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
