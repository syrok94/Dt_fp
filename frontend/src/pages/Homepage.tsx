import AdminDashboard from "../component/Board";
import NavBar from "../component/NavBar";
// import DeveloperDashboard from "../component/DeveloperDashboard";
import Sidebar from "../component/Sidebar";

const Homepage = () => {
  return (
    <div className="flex flex-col">
        <NavBar />
        <div className="flex">
        <Sidebar />
        <AdminDashboard />
        </div>
     
    </div>
  );
};

export default Homepage;
