import { BiTask } from "react-icons/bi";
import { BsClipboard2Data } from "react-icons/bs";
import { GoProjectRoadmap } from "react-icons/go";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbReport } from "react-icons/tb";

const MyIcons = ({ type }) => {
  const renderIcon = () => {
    switch (type) {
      case "LuLayoutDashboard":
        return <LuLayoutDashboard className="text-2xl" />;
      case "GoProjectRoadmap":
        return <GoProjectRoadmap className="text-2xl" />;
      case "BiTask":
        return <BiTask className="text-2xl" />;
      case "TbReport":
        return <TbReport className="text-2xl" />;
        case "BsClipboard2Data":
        return <BsClipboard2Data className="text-2xl" />;
      default:
        return <span>❓</span>;
    }
  };

  return <div>{renderIcon()}</div>;
};

export default MyIcons;
