import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doSignUp } from "../services/ApiServices";
import {project_title , project_register_desc ,baseURL} from "../config/Config.json";
const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError(""); 

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required!");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address!");
      return;
    }

    const payload = {
      name: `${firstName} ${lastName}`, // Include last name in name
      email: email,
      password: password,
      role: "DEVELOPER",
    };
    console.log(payload)

    try {
      const response = await doSignUp(payload);

      if (response.ok) {
        navigate("/");
      } else {
       setError("Unable to register!");
      }
    } catch (err) {
      setError("An error occurred while registering. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row w-full h-screen">
      {/* Left Side */}
      <div className="lg:w-6/12 bg-slate-400 flex flex-col justify-center items-center p-8 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">{project_title}</h1>
        <p className="text-lg">
          {project_register_desc}
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="flex flex-col justify-center items-center lg:w-6/12 px-6">
        <p className="text-3xl font-bold mb-6">REGISTER</p>

        {error && (
          <p className="w-2/3 mb-4 text-sm text-red-500 bg-red-100 p-2 rounded-md">
            {error}
          </p>
        )}

        <div className="w-full flex flex-col items-center gap-4">
          <input
            type="text"
            value={firstName}
            className="w-2/3 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            className="w-2/3 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
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

          <button
            className="w-2/3 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            onClick={handleSignup}
          >
            Sign Up
          </button>
        </div>

        <div className="w-2/3 flex justify-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-blue-500 cursor-pointer"
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
