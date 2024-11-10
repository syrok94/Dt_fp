import { useNavigate } from "react-router-dom"


const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="w-full flex flex-row justify-between">
      <div>Landing page</div>
      <div className=" flex flex-row p-2">
        <button className=" p-2 border border-black rounded-md" onClick={() => navigate("/login")}>Login</button>
        <button className="p-2 border border-black rounded-md" onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  )
}

export default LandingPage