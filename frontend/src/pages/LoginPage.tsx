import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { doSignIn, fetchAllBoards } from "../services/ApiServices";
import { LoginContext } from "../contexts/loginContext";
import { UserContext } from "../contexts/userContext";
import {
  Board,
  BoardContextType,
  LoginContextType,
  UserContextType,
} from "../interfaces/contextInterface";
import { project_title, project_login_desc } from "../config/Config.json";
import { BoardContext } from "../contexts/BoardContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, setError] = useState("");

  const loginContext = useContext(LoginContext);
  const userContext = useContext(UserContext);

  const boardContext = useContext(BoardContext);

  const { setBoards } = boardContext as unknown as BoardContextType;

  if (!loginContext) {
    throw new Error("LoginPage must be used within a LoginContextProvider");
  }
  if (!userContext) {
    throw new Error("LoginPage must be used within a UserContextProvider");
  }

  const { setToken } = loginContext as LoginContextType;
  const { setUser } = userContext as UserContextType;

  // Async function to handle login
  const handleSignin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and Password are required!");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address!");
      return;
    }

    const payload = { email, password };

    try {
      const response = await doSignIn(payload);

      if (!response) {
        throw new Error("Invalid response from server");
      }

      //setting token and user
      setToken(response.accessToken);
      setUser(response.userInfo);

      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.userInfo));

      console.log(
        "user info from localstorage : ",
        localStorage.getItem("user"),
        localStorage.getItem("token")
      );

      if (response.userInfo.role === "ADMIN") {
        try {
          const data: Board[] | null = await fetchAllBoards();
          if (Array.isArray(data) && data.length > 0) {
            setBoards(data);
          }
        } catch (error) {
          console.error("Error fetching boards:", error);
        }
        navigate("/adminHome");
      } else {
        navigate("/homepage");
      }
    } catch (err) {
      setError(`Unable to Login! ${err}`);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full h-screen">
      {/* Left Section */}
      <div className="lg:w-6/12 bg-slate-400 flex flex-col justify-center items-center p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">{project_title}</h1>
        <p className="text-lg">{project_login_desc}</p>
      </div>

      {/* Right Section - Login Form */}
      <div className="flex flex-col justify-center items-center lg:w-6/12 px-6">
        <p className="text-3xl font-bold mb-6">LOGIN</p>

        {error && (
          <p className="w-2/3 mb-4 text-sm text-red-500 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        <div className="w-full flex flex-col items-center gap-4">
          <input
            type="email"
            value={email}
            className="w-2/3 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            className="w-2/3 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="w-2/3 flex justify-end">
            <p
              onClick={handleForgotPassword}
              className="text-sm cursor-pointer text-blue-500 hover:underline"
            >
              Forgot Password?
            </p>
          </div>

          {/* Sign In Button */}
          <button
            className="w-2/3 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={handleSignin}
          >
            Sign In
          </button>
        </div>

        <div className="w-2/3 flex justify-center mt-4">
          <p className="text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
