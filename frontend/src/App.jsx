import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Patients from "./pages/dashboard/Patients";
import Doctors from "./pages/dashboard/Doctors";
import Employees from "./pages/dashboard/Employees";
import Appointments from "./pages/dashboard/Appointments";
import MedicalRecords from "./pages/dashboard/MedicalRecords";
import Billing from "./pages/dashboard/Billing";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route  path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>

        <Route path="/patients" element={<Patients />} />

        <Route path="/doctors" element={<Doctors />} />

        <Route path="/employees" element={<Employees />} />

        <Route path="/appointments" element={<Appointments />} />

        <Route  path="/records" element={<MedicalRecords />} />

        <Route  path="/billing" element={<Billing />} />

        <Route  path="/reports"  element={<Reports />} />

        <Route  path="/settings"  element={<Settings />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;