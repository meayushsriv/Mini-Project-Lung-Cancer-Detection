import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = "http://localhost:3000"
    const [dToken, setDToken] = useState(localStorage.getItem('DToken') ? localStorage.getItem('DToken') : '');
    const [appointments, setAppointments] = useState([])
    const [dashData,setDashData] = useState([]);
    const [profileData,setProfileData] = useState([])

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/doctor/appointments', { headers: { dToken } });
            if (data.success) {
                setAppointments(data.appointments)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const getDashData = async ()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
                setDashData(data.dashData)
            }else{
                console.log(data.message); 
            }
        } catch (error) {
            console.log(error);
        }
    }

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/complete-appointment', { appointmentId }, { headers: { dToken } });
            if (data.success) {
                toast.success(data.message)
                getAppointments();
                getDashData();
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/cancel-appointment', { appointmentId }, { headers: { dToken } });
            if (data.success) {
                toast.success(data.message)
                getAppointments();
                getDashData();
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getProfileData = async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const value = { dToken, setDToken, backendUrl, appointments, setAppointments, getAppointments,completeAppointment,cancelAppointment ,getDashData,dashData,setDashData,getProfileData,profileData,setProfileData}

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;