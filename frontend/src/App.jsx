import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Assistant from "./pages/Assistant";
import MyAppointments from "./pages/MyAppointments";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import Curanet from "./pages/Curanet";
import HealthEducation from "./pages/HealthEducation";
import Sponsors from "./pages/Sponsors";
import EHRIntegration from "./pages/EHRIntegration";
import HealthAccess from "./pages/HealthAccess";
import LungCancerDetection from "./pages/LungCancerDetection";

function App() {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />}></Route>
        <Route path="/doctors/:speciality" element={<Doctors />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/healthaccess" element={<HealthAccess />}></Route>
        <Route path="/curanet" element={<Curanet />}></Route>
        <Route path="/ehr" element={<EHRIntegration />}></Route>
        <Route path="/sponsors" element={<Sponsors />}></Route>
        <Route path="/healtheducation" element={<HealthEducation />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/my-profile" element={<MyProfile />}></Route>
        <Route path="/my-appointment" element={<MyAppointments />}></Route>
        <Route path="/appointment/:docId" element={<Appointment />}></Route>
        <Route
          path="/lungcancerdetection"
          element={<LungCancerDetection />}
        ></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
