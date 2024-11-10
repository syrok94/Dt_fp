import { useNavigate } from "react-router-dom";
import Input from "../component/Input";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row justify-between h-screen">
      <div className="w-6/12 bg-slate-400"></div>
      <div className="w-6/12 flex flex-col justify-center items-center">
        <div className=" flex flex-row p-2"></div>
        <p className="text-3xl font-bold">LOGIN</p>
        <Input type="text" className="w-2/3 p-4" placeholder="Email" />
        <Input type="password" className="w-2/3 p-4" placeholder="password" />
        <div className="w-full p-4 flex flex-row justify-center">
          <button
            className="w-2/3 p-2 border border-black rounded-md"
            onClick={() => navigate("/homepage")}
          >
            SignIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
