import { Route, Routes } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Send from "./components/Send";

function App() {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send/:id" element={<Send />} />
      </Routes>
    </div>
  );
}

export default App;
