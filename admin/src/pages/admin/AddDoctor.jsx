import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import toast from 'react-hot-toast'
import { AdminContext } from '../../context/AdminContext'
import axios from 'axios'
import Loader from '../../components/Loader'


const AddDoctor = () => {

  const { aToken, backendUrl } = useContext(AdminContext);
  const [docImg, setDocImg] = useState(false)
  const [loader, setLoader] = useState(false)

  const [docData, setDocData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: 'General physician',
    degree: '',
    experience: '1 Year',
    about: '',
    fees: '',
    address: {
      line1: "",
      line2: ""
    }
  })

  const handleInput = (e) => {
    if (e.target.name === 'line1' || e.target.name === 'line2') {
      setDocData({ ...docData, address: { ...docData.address, [e.target.name]: e.target.value } })
    } else {
      setDocData({ ...docData, [e.target.name]: e.target.value })
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoader(true)
    const formData = new FormData()

    Object.keys(docData).forEach((key) => {
      if (key === 'address') {
        formData.append(key, JSON.stringify(docData.address))
      } else {
        formData.append(key, docData[key])
      }
    })

    if (docImg) {
      formData.append('image', docImg)
    } else {
      toast.error("Image is required")
      return;
    }

    try {
      const response = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (response.data.success) {
        toast.success(response.data.message)

        // Reset the states
        setDocData({
          name: '',
          email: '',
          password: '',
          speciality: 'General physician',
          degree: '',
          experience: '1 Year',
          about: '',
          fees: '',
          address: {
            line1: "",
            line2: ""
          }
        })
        setDocImg(false)
      } else {
        toast.error(response.data.message)
      }
      setLoader(false)

    } catch (error) {
      console.log(error);
      setLoader(false)
    }
  }

  return (
    <form className='m-5 w-full relative' onSubmit={handleSubmit}>
      {loader &&  <Loader />}
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='bg-gray-100 w-16 rounded-full cursor-pointer' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => { setDocImg(e.target.files[0]) }} type="file" id='doc-img' hidden />
          <p>Upload Doctor <br />Picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor name</p>
              <input name='name' onChange={handleInput} value={docData.name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input name='email' onChange={handleInput} value={docData.email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={handleInput} value={docData.password} name='password' className='border rounded px-3 py-2' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Experience</p>
              <select className='border rounded px-3 py-2' onChange={handleInput} value={docData.experience} name='experience'>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={handleInput} value={docData.fees} name='fees' className='border rounded px-3 py-2' type="number" placeholder='Fees' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select className='border rounded px-3 py-2' onChange={handleInput} value={docData.speciality} name='speciality'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Education</p>
              <input value={docData.degree} onChange={handleInput} name='degree' className='border rounded px-3 py-2' type="text" placeholder='Education' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Address</p>
              <input value={docData.address.line1} onChange={handleInput} name='line1' className='border rounded px-3 py-2' type="text" placeholder='Address 1' required />
              <input value={docData.address.line2} onChange={handleInput} name='line2' className='border rounded px-3 py-2' type="text" placeholder='Address 2' required />
            </div>

          </div>

        </div>

        <div>
          <p className='mt-4 mb-4'>About Doctor</p>
          <textarea value={docData.about} onChange={handleInput} name='about' className='w-full px-4 pt-2 border rounded' placeholder='Write about doctor' rows={5} required></textarea>
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full'>Add Doctor</button>

      </div>
    </form>
  )
}

export default AddDoctor
