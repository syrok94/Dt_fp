import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState<number>(20);
  const [error, setError] = useState<string>("");

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
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

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
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

  const handleSubmit = (): void => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === 4) {
      navigate("/updatePassword");
      alert("OTP Verified!");
    } else {
      setError("Invalid OTP");
    }
  };

  const handleResendOtp = (): void => {
    setOtp(["", "", "", ""]);
    setTimer(20);
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

        {timer > 0 && <p className="text-sm font-medium text-gray-600 mt-3">
          Time left: {timer}s
        </p>}

        <button
          onClick={handleResendOtp}
          disabled={timer > 0}
          className={`mt-3 w-full py-2 rounded-md focus:outline-none transition-all duration-300 shadow-md ${
            timer > 0
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
