import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
