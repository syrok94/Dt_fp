import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    console.log(email);
    console.log(password);

    setPassword("");

    setEmail("");

    navigate("/login");
  };

  return (
    <div className="w-full flex flex-row justify-between h-screen">
      <div className="w-6/12 bg-slate-400"></div>
      <div className="w-6/12 flex flex-col justify-center items-center">
        <div className=" flex flex-row p-2"></div>
        <p className="text-3xl font-bold">LOGIN</p>
        <div className="w-full p-4 flex flex-col items-center">
          <input
            type="text"
            value={email}
            className="w-2/3 p-4 border border-black rounded-md"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            className="w-2/3 p-4 border border-black rounded-md"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-2/3 p-2 border border-black rounded-md"
            onClick={handleSignin}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
