import { useState, useEffect, useRef, useCallback } from "react";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "../contexts/loginContext";
import { useUserContext } from "../contexts/userContext";

const NavBar = () => {
  const { token } = useLoginContext();
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const baseUrl = "http://localhost:8082";

  const handleUser = () => setIsOpen((prev) => !prev);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Logout failed");

      // Remove token only if logout is successful
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full h-16 bg-black flex justify-between items-center px-4">
      <div className="text-blue-50 font-bold"></div>
      <div className="text-white flex items-center relative">
        {/* User Icon */}
        <FaRegUser
          className="text-xl hover:text-blue-300 transition-colors duration-300 cursor-pointer"
          onClick={handleUser}
        />

        {/* Dropdown Menu */}
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

        {/* User Name */}
        <div className="ml-2">{user ? user.name : "Guest"}</div>
      </div>
    </div>
  );
};

export default NavBar;
