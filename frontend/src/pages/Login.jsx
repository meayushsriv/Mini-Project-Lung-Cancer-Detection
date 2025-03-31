import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up')
  const { token, setToken, backendUrl } = useContext(AppContext)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: ""
  })

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (state === "Sign Up") {
      try {
        const resposne = await axios.post(backendUrl + '/api/user/register', data);
        if (resposne.data.success) {
          toast.success("registered successfully")
          setToken(resposne.data.token)
          localStorage.setItem("token", resposne.data.token)
          navigate("/")
        }
        else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    } else {
      try {
        const response = await axios.post(backendUrl + '/api/user/login', data);
        if (response.data.success) {
          toast.success("Logged in success")
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          navigate("/")
        }
        else {
          toast.error(response.data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
    }
  }


  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === "Sign Up" ? "Create Account" : "Login"}</p>
        <p>Please {state === "Sign Up" ? "sign up" : "login"} to book an appointment</p>
        {state === "Sign Up" && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full py-2 px-1 mt-1 outline-none' type="text" value={data.name} onChange={handleInput} name='name' required />
        </div>}
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full py-2 mt-1 px-1 outline-none' type="email" value={data.email} onChange={handleInput} name='email' required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full py-2 mt-1 px-1 outline-none' type="password" value={data.password} onChange={handleInput} name='password' required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {
          state === "Sign Up"
            ? <p>Already have an Account? <span onClick={() => { setState("Login") }} className='text-primary underline cursor-pointer'>Login here</span></p> :
            <p>Create a new account? <span onClick={() => { setState("Sign Up") }} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
