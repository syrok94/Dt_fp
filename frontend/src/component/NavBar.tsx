import { useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../contexts/userContext";
import { UserContextType } from "../interfaces/contextInterface";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext as UserContextType;

  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const handleUser = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
            <div className="px-2 py-1 hover:bg-gray-700 cursor-pointer" onClick={()=>navigate("/userProfile")}>User Profile</div>
            <div className="px-2 py-1 hover:bg-gray-700 cursor-pointer">Logout</div>
          </div>
        )}
        <div className="ml-2">{user ? user.name : "Guest"}</div>
      </div>
    </div>
  );
};

export default NavBar;
