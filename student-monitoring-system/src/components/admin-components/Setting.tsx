// import React from 'react'
import TopBar from '../TopBar'
import SideBar from '../SideBar'
import { useEffect, useState } from 'react'
import default_profile from '../../images/default-profile.png'
import DOMAIN from '../../config/config'
import { MdCancel } from "react-icons/md";
import ChangePassword from '../ChangePassword'


interface User {
  _id: string
  profile: string
  email: string
  firstName: string
  lastName: string
  role: string,
  date_of_birth: string,
  address: string,
  phone_number: string
}

const Setting = () => {
  const [activeSection, setActiveSection] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)

  const [isEdit, setIsEdit] = useState<Boolean>(false)

  const [successMessage, setSuccessMessage] = useState<string>('')

  const [profile, setProfile] = useState<File | null>(null);
  const [baseProfile, setBaseProfile] = useState<string>('')
  const [firstName, setFirstName] = useState<string>(user?.firstName || '')
  const [lastName, setLastName] = useState<string>(user?.lastName || '')
  const [email, setEmail] = useState<string>(user?.email || '')
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [address, setAddress] = useState<string>(user?.address || '')
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone_number || '')



  const handleSection = (value: string) => {
    setActiveSection(value)
    localStorage.setItem('active-section', value)
  }

  useEffect(() => {
    const activeSection = localStorage.getItem('active-section')
    if (activeSection !== null) {
      setActiveSection(activeSection)
    }
  }, [])

  // console.log(user)


  // get info
  useEffect(() => {
    const getInfo = async () => {
      const token = localStorage.getItem('token')

      // console.log('tokennnn', token)
      try {
        const response = await fetch(`${DOMAIN}/setting`, {
          method: 'GET',
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })

        if (!response.ok) {
          console.log(response.statusText)
          return
        }

        const data = await response.json()

        console.log(data.user)
        setUser(data.user)
        // setProfile(data.user.profile)
        setBaseProfile(data.user.profile)
        setFirstName(data.user.firstName)
        setLastName(data.user.lastName)
        setEmail(data.user.email)
        setPhoneNumber(data.user.phone_number)
        setDate(new Date(data.user.date_of_birth).toISOString().split("T")[0]);
        setAddress(data.user.address)
      } catch (error) {
        console.log(error)
      }
    }
    getInfo()
  }, [])

  // edit user
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('date', date);
    formData.append('address', address);
    if (profile) {
      formData.append('profile', profile); // only add if file exists
    }

    try {
      const response = await fetch(`${DOMAIN}/user/update-information/${user?._id}`, {
        method: 'PUT',
        // headers: {
        // "Content-Type": "application/json",
        // "Content-Type": "multipart/form-data"
        // },
        body: formData
      })
      const data = await response.json()
      console.log(data)
      setSuccessMessage(data.message)

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.log(error)
    }

  }



  if (!user) {
    return (<div className="flex min-h-screen relative">
      {/* Sidebar (Fixed Width) */}
      <SideBar />
      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
      </div>
    </div>)

  }

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar (Fixed Width) */}
      <SideBar />
      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="p-5">
          <h2 className='text-2xl font-bold mb-2'>Settings</h2>

          <div className='flex gap-4'>
            {/* setthing navigation */}
            <div className='bg-gray-300 w-[20%] min-h-[400px] h-[500px]  px-7 py-3'>
              <h2 className={`cursor-pointer ${activeSection === 'profile' ? 'bg-amber-400' : ''} rounded-sm py-1 px-2.5`} onClick={() => handleSection('profile')}>Profile Information</h2>
              <h2 className={`cursor-pointer ${activeSection === 'change-password' ? 'bg-amber-400' : ''} rounded-sm py-1 px-2.5`} onClick={() => handleSection('change-password')}>Change Password</h2>
            </div>
            {/* settings main page */}
            <div className='flex-1 bg-gray-300 w-[80%] overflow-auto'>
              {activeSection === 'profile' &&
                <div className='flex-1 grid gap-2 p-4'>
                  <h2 className='font-bold text-2xl'>Profile Information</h2>

                  <div className='bg-amber-400 grid grid-cols-2 gap-4 w-full p-5  rounded-sm'>
                    <div className='flex items-center justify-start gap-4'>
                      <div>
                        <img src={baseProfile || default_profile} alt="" className='w-24 h-auto rounded-[50%]' />
                      </div>
                      <div className=''>
                        <p>{user?.firstName} {user?.lastName}</p>
                        <p>{user?.role}</p>
                      </div>
                    </div>

                    <div className='flex items-center justify-center'>
                      <button className="bg-gray-900 hover:bg-gray-700 text-white p-2 w-24 rounded-md cursor-pointer" onClick={() => setIsEdit(!isEdit)}>Edit Profile</button>
                    </div>
                  </div>

                  <div className='flex-1 bg-amber-400  items-center gap-4 w-full p-5 rounded-sm'>
                    <div className='grid grid-cols-3 w-full gap-5'>
                      <div>
                        <h2>First name: {user?.firstName}</h2>
                      </div>

                      <div>
                        <h2>Last Name: {user?.lastName}</h2>
                      </div>

                      <div>
                        <h2>Date of Birth: {date}</h2>
                      </div>

                      <div>
                        <h2>Email: {user?.email}</h2>
                      </div>

                      <div>
                        <h2>Phone Number: {user.phone_number}</h2>
                      </div>

                      <div>
                        <h2>Address: {user.address}</h2>
                      </div>
                    </div>

                  </div>

                </div>}

              {activeSection === 'change-password' && <ChangePassword />}

            </div>
          </div>
        </div>
      </div>

      {/* update profile */}
      {isEdit ? <div className='absolute grid gap-2 p-4 bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-xl rounded-sm'>
        <div className='flex justify-end'>
          < MdCancel size={30} onClick={() => setIsEdit(!isEdit)} className='' />
        </div>

        {successMessage ? <p className='text-center text-white bg-green-500 px-4 py-2'>{successMessage}</p> : ''}
        <h2 className='font-bold text-2xl'>Edit Profile Information</h2>

        <div className='bg-amber-400 flex items-center gap-4 w-full p-5 rounded-sm'>
          <form onSubmit={handleEditSubmit} className='grid grid-cols-2 w-full gap-3.5'>

            <div className='flex justify-center'>
              <img src={profile ? URL.createObjectURL(profile) : baseProfile || default_profile} alt="" className='w-24 h-auto rounded-[50%]' />
            </div>

            <div>
              <label htmlFor="profile">Profile</label><br />
              <input
                id='profile'
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    setProfile(e.target.files[0])
                  }
                }}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="firtname">First Name</label><br />
              <input
                id='firtname'
                placeholder='Enter First Name'
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="lastname">Last Name</label><br />
              <input
                id='lastname'
                placeholder='Enter Last Name'
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="dateofbirth">Date of Birth:</label><br />
              <input
                id='dateofbirth'
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="email">Email:</label><br />
              <input
                id='email'
                placeholder='Enter Email'
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="number">Phone Number</label><br />
              <input
                id='number'
                placeholder='Enter Phone Number'
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="address">Address</label><br />
              <input
                id='address'
                placeholder='Enter Address'
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="border p-2 w-full rounded-sm"
              />
            </div>

            <button type='submit' className="bg-gray-900 hover:bg-gray-700 text-white p-2 w-full rounded-md cursor-pointer">Submit</button>
          </form>

        </div>

      </div> : ''}
    </div>
  )
}

export default Setting
