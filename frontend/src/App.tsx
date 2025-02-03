import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import LoginContextProvider from "./contexts/loginContext";
import UserContextProvider from "./contexts/userContext";
import Sidebar from "./component/Sidebar";
import NavBar from "./component/NavBar";
import ProtectedRoute from "./component/ProtectedRoute"; // Import the ProtectedRoute component
import Board from "./component/Board";

const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Homepage = lazy(() => import("./pages/Homepage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
const AdminDashboard = lazy(() => import("./component/AdminDashboard"));

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/register", "/forgotPassword"];
  const hideSidebarRoutes = ["/", "/register", "/forgotPassword"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="app-container flex">
      {shouldShowSidebar && <Sidebar />}
      <div className="content flex-1">
        {shouldShowNavbar && <NavBar />}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />

            {/* Protected Routes wrapped in ProtectedRoute */}
            <Route
              path="/homepage"
              element={
                <ProtectedRoute>
                  <Homepage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userProfile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/adminDashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/board"
              element={
                <ProtectedRoute>
                  <Board />
                </ProtectedRoute>
              }
            />

            {/* Redirect all unknown routes to login */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LoginContextProvider>
        <UserContextProvider>
          <AppContent />
        </UserContextProvider>
      </LoginContextProvider>
    </Router>
  );
}

export default App;
