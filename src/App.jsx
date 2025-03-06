import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Userpage from "./pages/Userpage";
import FeedbackPage from "./pages/FeedbackPage";
import ReportsPage from "./pages/ReportsPage";
import CitizenEducationPage from "./pages/CitizenEducationPage";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminIncidentManagement from "./pages/AdminIncidentManagement.jsx";
import AdminPolls from "./pages/AdminPolls.jsx";
import AdminFeedback from "./pages/AdminFeedback.jsx";
import RoleBasedRedirect from "./pages/RoleBasedRedirect.jsx";

export default function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Userpage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/education" element={<CitizenEducationPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/incidents" element={<AdminIncidentManagement />} />
        <Route path="/polls" element={<AdminPolls />} />
        <Route path="/feedbacks" element={<AdminFeedback />} />

        <Route path="/redirect" element={<RoleBasedRedirect />} />
      </Routes>
    </Router>
  );
}
