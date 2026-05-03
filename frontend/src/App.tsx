import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Auth from "./Auth/Auth";
import Display from "./DisplayPage";
import StudentDashboard from "./DashBoard/StudentDashBoard";
import AdminDashboard from "./DashBoard/AdminDashBoard";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Display />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
