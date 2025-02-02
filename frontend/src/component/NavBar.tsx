import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/userContext";
import { LoginContext } from "../contexts/loginContext";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userContext = useContext(UserContext);
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const user = userContext?.user ?? { name: "Guest" };
  const token = loginContext?.token;


  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = "http://localhost:8082";

  const handleUser = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);

      if (!res.ok) {
        throw new Error("Logout failed");
      }


      localStorage.removeItem("user");
      localStorage.removeItem("token");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full h-16 bg-black flex justify-between items-center px-4">
      <div className="text-blue-50 font-bold">Planovate</div>
      <div className="text-white flex items-center text-baseline relative">
        <FaRegUser
          className="text-xl hover:text-blue-300 transition-colors duration-300 cursor-pointer"
          onClick={handleUser}
        />
        {isOpen && (
          <div
            ref={profileRef}
            className="absolute top-full right-0 mt-2 bg-gray-800 text-white rounded-md shadow-lg p-2 w-40"
          >
            <div className="px-2 py-1 hover:bg-gray-700 cursor-pointer" onClick={() => navigate("/userProfile")}>
              User Profile
            </div>
            <div className="px-2 py-1 hover:bg-gray-700 cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
        )}
        <div className="ml-2">{user.name}</div>
      </div>
    </div>
  );
};

export default NavBar;
