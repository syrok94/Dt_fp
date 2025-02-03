import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

const UpdatePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (newPassword === confirmPassword && newPassword.length >= 6) {
      alert("Password Updated Successfully!");
      setError("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
    } else if (newPassword !== confirmPassword) {
      setError("Passwords do not match !!");
    } else {
      setError("Password too short.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Update Password
        </h2>


        <div className="relative w-full mb-3">
          <input
            type={showPassword ? "text" : "password"} 
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>


        <div className="relative w-full mb-3">
          <input
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </span>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-300 shadow-md"
        >
          Update Password
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default UpdatePassword;
