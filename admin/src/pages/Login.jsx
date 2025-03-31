import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets.js'
import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import toast from 'react-hot-toast'
import { DoctorContext } from '../context/DoctorContext.jsx'

const Login = () => {

  const [state, setState] = useState("Admin")
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  const inputHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {

    e.preventDefault()
    try {
      if (state === "Admin") {
        const response = await axios.post(backendUrl + "/api/admin/login", data)
        if (response.data.success) {
          localStorage.setItem("AToken", response.data.token)
          setAToken(response.data.token)
          toast.success("Successfully logged In")
        } else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backendUrl + '/api/doctor/login', data);
        if (response.data.success) {
          localStorage.setItem("DToken", response.data.token)
          setDToken(response.data.token)
          toast.success("Successfully logged In")
        } else {
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state} </span>Login</p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={inputHandler} value={data.email} name='email' className='border border-[#dadada] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={inputHandler} value={data.password} name='password' className='border border-[#dadada] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === "Admin"
            ? <p>Doctor Login  <span className='text-primary underline cursor-pointer' onClick={() => { setState("Doctor") }}>Click here</span></p>
            : <p>Admin Login  <span className='text-primary underline cursor-pointer' onClick={() => { setState("Admin") }}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
