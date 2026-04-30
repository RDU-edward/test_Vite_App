import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "../src/component/LandingPage";
import ViewHouseDetails from "./pages/ViewHouseDetails";
import ViewAllHouses from "./pages/ViewAllHouses";
import UserDashboard from "./pages/UserDashboard";
import AdminMainDashboard from "./pages/AdminMainDashboard";
import ManagerProperty from "./pages/ManagerProperty";
import ManagerDashboard from "./pages/ManagerDashboard";
import "normalize.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/viewHouseDetails/:id" element={<ViewHouseDetails />} />
        <Route path="/viewAllHouses" element={<ViewAllHouses />} />
        <Route path="/manager/dashboard" element={<ManagerDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard_main" element={<AdminMainDashboard />} />
        <Route path="/manager/property_list" element={<ManagerProperty />} />
      </Routes>
    </Router>
  );
}

export default App;
