import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "../src/component/LandingPage";
import ViewHouseDetails from "./pages/ViewHouseDetails";
import ViewCondoDetails from "./pages/ViewCondoDetails";
import ViewAllHouses from "./pages/ViewAllHouses";
import ViewAllCondos from "./pages/ViewAllCondos";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminMainDashboard from "./pages/AdminMainDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/viewHouseDetails/:id" element={<ViewHouseDetails />} />
        <Route path="/viewCondoDetails/:id" element={<ViewCondoDetails />} />
        <Route path="/viewAllHouses" element={<ViewAllHouses />} />
        <Route path="/viewAllCondos" element={<ViewAllCondos />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/admin/dashboard_main" element={<AdminMainDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
