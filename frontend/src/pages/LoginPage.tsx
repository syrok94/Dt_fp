import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    console.log(email);
    console.log(password);

    const res = await fetch("http://localhost:5001/chat");

    console.log(res.json());

    setPassword("");

    setEmail("");

    navigate("/homepage");
  };

  return (
    <div className="w-full flex flex-col-reverse justify-between h-screen lg:flex lg:flex-row">
      
      
      <div className=" bg-slate-400 lg:w-6/12"></div>
      
      
      <div className=" flex flex-col justify-center items-center lg:w-6/12">
        <div className=" flex flex-row p-2"></div>
        <p className="text-3xl font-bold">LOGIN</p>
        <div className="w-full p-4 flex flex-col items-center gap-3
        ">
          <input
            type="text"
            value={email}
            className="w-2/3 p-4 border border-black rounded-md "
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
            className="w-2/3 p-2 border border-black rounded-md bg-slate-400"
            onClick={handleSignin}
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
