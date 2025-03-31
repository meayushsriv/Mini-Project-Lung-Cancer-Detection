import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("AToken") ? localStorage.getItem("AToken") : '');
    const backendUrl = "https://prescripto-backend-gx6e.onrender.com";
    const [doctors, setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState([]);

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/all-doctors", {}, { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [])

    const changeAvailability = async (docId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                getAllDoctors();
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                console.log(data.appointments)
                setAppointments(data.appointments);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + "/api/admin/cancel-appointment", { appointmentId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointments();
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getDashData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
            if (data.success) {
                setDashData(data.dashData);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const value = { aToken, setAToken, backendUrl, doctors, changeAvailability, appointments, setAppointments, getAllAppointments, cancelAppointment,getDashData,dashData }


    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;