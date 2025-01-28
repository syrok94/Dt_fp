import { useState } from 'react';
import { LuLayoutDashboard } from "react-icons/lu";
import { GoProjectRoadmap } from "react-icons/go";
import { BiTask } from "react-icons/bi";
import { TbReport } from "react-icons/tb";
import { AiOutlineClose } from 'react-icons/ai';  // Import close icon

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 z-50 w-48 bg-gray-800 text-white p-6 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 h-full`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Agile Board</h1>
          {/* Close Button */}
          <button onClick={toggleSidebar} className="lg:hidden text-2xl">
            <AiOutlineClose />
          </button>
        </div>
        <ul>
          <li className="mb-6 flex items-center gap-4">
            <LuLayoutDashboard className="text-2xl" />
            <a href="/" className="hover:text-blue-400">Dashboard</a>
          </li>
          <li className="mb-6 flex items-center gap-4">
            <GoProjectRoadmap className="text-2xl" />
            <a href="/" className="hover:text-blue-400">Projects</a>
          </li>
          <li className="mb-6 flex items-center gap-4">
            <BiTask className="text-2xl" />
            <a href="/" className="hover:text-blue-400">Tasks</a>
          </li>
          <li className="mb-6 flex items-center gap-4">
            <TbReport className="text-2xl" />
            <a href="/" className="hover:text-blue-400">Reports</a>
          </li>
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-1 p-6">
        <button
          className="lg:hidden bg-gray-800 text-white p-2 rounded-full"
          onClick={toggleSidebar}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome to Agile Board</h1>
          <p className="mt-4">Manage your tasks and collaborate effectively.</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
