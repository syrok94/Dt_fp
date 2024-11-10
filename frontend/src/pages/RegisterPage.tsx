import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    console.log(password);

    setEmail("");
    setLastName("");
    setEmail("");
    setFirstName("");

    navigate("/login");
  };

  return (
    <div className="w-full flex flex-row justify-between h-screen">
      <div className="w-6/12 bg-slate-400"></div>
      <div className="w-6/12 flex flex-col justify-center items-center">
        <p className="text-3xl font-bold">REGISTER</p>
        <div className="w-full p-4 flex flex-col items-center">
          <input
            type="text"
            value={firstName}
            className="w-2/3 p-4 border border-black rounded-md"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            className="w-2/3 p-4 border border-black rounded-md"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
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
            onClick={handleSignup}
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
