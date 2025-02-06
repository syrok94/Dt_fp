import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(2 * 60); // 2 minutes in seconds
  const [error, setError] = useState<string>("");
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const baseURL = "http://localhost:8082";

  // Countdown Timer Effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false); // Enable the resend OTP button after timer expires
    }
  }, [timer]);

  // Handle OTP Input Change
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = value;
        return newOtp;
      });
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
      setError("");
    }
  };

  // Handle Backspace in OTP Input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      setOtp((prevOtp) => {
        const newOtp = [...prevOtp];
        newOtp[index] = "";
        return newOtp;
      });
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      setError("");
    }
  };

  // Submit OTP for Verification
  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Invalid OTP");
      return;
    }

    try {
      const response = await fetch(`${baseURL}/forgotPassword/validateOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: enteredOtp }),
      });

      const data = await response.json();
      if (response.ok && data.message === "Valid") {
        navigate("/updatePassword", { state: { email } }); // Pass email to update password page
      } else {
        setError("Invalid OTP");
      }
    } catch (err) {
      setError("Error verifying OTP. Try again.");
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    try {
      const response = await fetch(`${baseURL}/forgotPassword/generateOtp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtp(["", "", "", ""]); // Clear OTP fields
        setTimer(2 * 60); // Reset timer to 2 minutes
        setError(""); // Clear errors
        setIsResendDisabled(true); // Disable button until timer expires
      } else {
        setError("Failed to resend OTP. Try again later.");
      }
    } catch (err) {
      setError("Error sending OTP request. Check your connection.");
    }
  };

  // Convert Timer to MM:SS Format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-1/3 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter OTP</h2>

        <div className="flex gap-3 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-10 text-center text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white shadow-sm"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none transition-all duration-300 shadow-md"
        >
          Verify OTP
        </button>

        {timer > 0 ? (
          <p className="text-sm font-medium text-gray-600 mt-3">Time left: {formatTime(timer)}</p>
        ) : (
          <p className="text-sm font-medium text-red-500 mt-3">OTP Expired</p>
        )}

        <button
          onClick={handleResendOtp}
          disabled={isResendDisabled}
          className={`mt-3 w-full py-2 rounded-md focus:outline-none transition-all duration-300 shadow-md ${
            isResendDisabled
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-900"
          }`}
        >
          Resend OTP
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default OTPVerification;
