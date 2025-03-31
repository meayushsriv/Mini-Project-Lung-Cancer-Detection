import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader.jsx'

const MyProfile = () => {

  const { backendUrl, userData, setUserData, token, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [loading, setLoading] = useState(false)

  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleInput = (e) => {
    if (e.target.name === 'line1' || e.target.name === 'line2') {
      setUserData({ ...userData, address: { ...userData.address, [e.target.name]: e.target.value } })
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()

    Object.keys(userData).forEach((key) => {
      if (key === 'address') {
        formData.append(key, JSON.stringify(userData.address))
      } else {
        formData.append(key, userData[key])
      }
    })

    if (image) {
      formData.append('image', image)
    }

    try {
      const response = await axios.post(backendUrl + '/api/user/update', formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        loadUserProfileData();
        setLoading(false)
      } else {
        toast.error(response.data.message)
        setLoading(false)
      }

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }



  return userData && (
    <div className='max-w-lg flex flex-col gap-2.5 text-sm'>
      {loading && <Loader />}
      {
        isEdit
          ? <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded-full opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
            </div>
            <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' hidden />
          </label>
          : <img className='w-36 rounded-full' src={userData.image} alt="" />
      }

      {
        isEdit
          ? <input className='text-3xl font-medium max-w-96 mt-4 border border-zinc-300 rounded w-full py-2 px-1' type="text" value={userData.name} name='name' onChange={handleInput} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-700'>
          <p className='font-medium'>Email Id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='text-medium'>Phone:</p>
          {
            isEdit
              ? <input className='max-w-52 border border-zinc-300 rounded w-full py-1 px-1' type="text" value={userData.phone} onChange={handleInput} name='phone' />
              : <p className='text-blue-400'>{userData.phone}</p>
          }
          <p className='font-medium'>Adress:</p>
          {
            isEdit
              ? <p>
                <input className='border border-zinc-300 rounded w-full py-1 px-1' type="text" value={userData.address.line1} onChange={handleInput} name='line1' />
                <br />
                <input className='border border-zinc-300 rounded w-full py-1 px-1' type="text" value={userData.address.line2} onChange={handleInput} name='line2' />
              </p>
              : <p className='text-gray-500'>
                {userData?.address?.line1}
                <br />
                {userData?.address?.line2}
              </p>
          }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ? <select className='max-w-28 border border-zinc-300 rounded w-full py-1 px-1' onChange={handleInput} value={userData.gender} name='gender'>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select> :
              <p className='text-gray-400'>{userData.gender}</p>
          }
          <p className='font-medium'>BirthDate:</p>
          {
            isEdit ? <input className='max-w-28 border border-zinc-300 rounded w-full py-1 px-1' type="date" onChange={handleInput} name='dob' value={userData.dob} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-150' onClick={(e) => { setIsEdit(false); handleSubmit(e) }}>Save Information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-150' onClick={(e) => { setIsEdit(true) }}>Edit</button>
        }
      </div>
    </div>
  )
}

export default MyProfile
