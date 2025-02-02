import AdminDashboard from "../component/AdminDashboard";
// import DeveloperDashboard from "../component/DeveloperDashboard";
import Sidebar from "../component/Sidebar";

const Homepage = () => {
  return (
    <div className="flex">
      
        <Sidebar />
        <AdminDashboard />
     
    </div>
  );
};

export default Homepage;
