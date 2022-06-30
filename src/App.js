import "./App.css";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import { Forgot } from "./Pages/ForgotPassword";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Search } from "./Pages/Search";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  );
}

export default App;
