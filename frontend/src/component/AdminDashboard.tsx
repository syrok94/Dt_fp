const AdminDashboard = () => {
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Tasks</h2>
            <p>Manage and track tasks assigned to developers.</p>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Developers</h2>
            <p>View and manage the list of developers.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default AdminDashboard;
  