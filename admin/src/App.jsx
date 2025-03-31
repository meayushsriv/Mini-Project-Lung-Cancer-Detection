import { useContext, useState } from "react";
import Login from "./pages/Login"
import { Toaster } from 'react-hot-toast';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/admin/Dashboard'
import AllAppointments from './pages/admin/AllAppointments'
import DoctorList from './pages/admin/DoctorsList'
import AddDoctor from './pages/admin/AddDoctor'
import Loader from "./components/Loader";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from './pages/doctor/DoctorAppointments'
import DoctorProfile from './pages/doctor/DoctorProfile'


function App() {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken  || dToken ? (
    <div>
      <Toaster />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>}></Route>
          <Route path="/admin-dashboard" element={<Dashboard />}></Route>
          <Route path="/all-appointments" element={<AllAppointments />}></Route>
          <Route path="/add-doctor" element={<AddDoctor />}></Route>
          <Route path="/doctor-list" element={<DoctorList />}></Route>


          <Route path="/doctor-dashboard" element={<DoctorDashboard />}></Route>
          <Route path="/doctor-appointments" element={<DoctorAppointments />}></Route>
          <Route path="/doctor-profile" element={<DoctorProfile />}></Route>
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <Toaster />
    </>
  )
}

export default App
