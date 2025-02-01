import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { usersConfig } from "./../config/Config.json";
import MyIcons from "./MyIcons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed top-0 left-0 z-50 w-48 min-h-screen bg-gray-800 text-white p-6 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:relative lg:translate-x-0 h-full`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-center">Planovate</h1>

        <button onClick={toggleSidebar} className="lg:hidden text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <ul>
        {usersConfig.sidebar.map((items, index) => {
          return (
            <li key={index} className="mb-6 flex items-center gap-4">
              <div className="flex justify-between m-4">
                <MyIcons type={items.icon} />
                <a
                  href={items.navigateTo}
                  className="hover:text-blue-400 ml-3 items-start"
                >
                  {items.name}
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
