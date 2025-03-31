import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const navigate = useNavigate();
    const currencySymbol = "$"
    const [doctors, setDoctors] = useState([])
    const backendUrl = 'https://prescripto-backend-gx6e.onrender.com'
    const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
    const [userData, setUserData] = useState(false)

    const getAllDoctors = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/list")
            setDoctors(data.doctors)
        } catch (error) {
            console.log(error);
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/user/get-profile", { headers: { token } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                console.log(data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }


    

    useEffect(() => {
        getAllDoctors()
    }, [])

    useEffect(() => {
        if (token) {
            loadUserProfileData();
        } else {
            setUserData(false)
        }
    }, [])

    const value = { doctors, currencySymbol, token, setToken, backendUrl, userData, setUserData, loadUserProfileData,getAllDoctors}

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;