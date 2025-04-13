// import React from 'react'
import TopBar from '../TopBar'
import SideBar from '../SideBar'
import { MdLiveHelp } from "react-icons/md";
import { useState } from 'react';


const Help = () => {
  const [isClickCreate, setIsClickCreate] = useState<boolean>(false)
  const [isResetPassword, setIsResetPassword] = useState<boolean>(false)
  return (
    <div className="flex h-auto">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className=" flex-1 flex-col">
        <TopBar />
        <div className="flex-1 bg-gray-50 p-5 relative flex justify-center  mx-auto w-full h-auto min-h-96">
          <MdLiveHelp size={30} className='absolute top-5 right-10 ' />
          <div className='w-[90%]'>

            <p className='font-bold mb-3'>For Admins (Handling Student, Parent, and Driver Issues)</p>

            <p className='font-bold mb-3'>For Students</p>

            <p>
              Q1: What should I do if a student loses their RFID card?
              A: If a student loses their RFID card, inform the admin or teacher immediately. A replacement card will be issued, and the student's profile will be updated with the new ID.

            </p>
            <p>
              Q2: What if a student forgot to tap their RFID card?
              A: If a student forgets to tap their RFID card, their attendance may not be recorded. The student should tap the card at the next boarding or exit to ensure their data is updated.

            </p>

            <p className='font-bold mb-3'>For Parents</p>


            <p>
              Q1: I did not receive an SMS notification when my child entered or exited the bus. What should I do?
              A: Ensure your mobile number is correctly registered in the system. If the number is correct and you're still not receiving notifications, check with the admin to verify if the system is functioning properly or if there are any issues with your registration.

            </p>
            <p>
              Q2: How can I update my mobile number for SMS notifications?
              A: You can update your mobile number by contacting the admin. They will assist in updating your details in the system to ensure you continue receiving SMS notifications.

            </p>


            <p className='font-bold mb-3'> For Drivers</p>

            <p>
              Q1: The RFID scanner is not detecting a student’s card. What should I do?
              A: First, check if the scanner is properly connected and powered on. If it’s still not working, report the issue to the admin using the Contact Support form via the Help button, and they will assist with troubleshooting.

            </p>
            <p>
              Q2: How do I know when to start or end the trip if I’m unsure of the schedule?
              A: The driver should refer to the trip schedule and route details available in the system. If you're unsure, contact the admin for clarification on the scheduled times for each trip.

            </p>
          </div>
        </div>

        <div className='flex justify-center my-6'>
          <div className='  border-2 border-gray-40 w-[60%] px-10 py-5 rounded-sm'>
            <ul className=''>
              <li onClick={() => setIsClickCreate(!isClickCreate)} className=' p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                How to create new Account
              </li>
              <p className={`${isClickCreate ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 '} px-2 transition-all duration-500 ease-in-out `}>
                Create
              </p>

              <li onClick={() => setIsResetPassword(!isResetPassword)} className=' p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                How to reset password
              </li>
              <p className={`${isResetPassword ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 '} px-2 transition-all duration-500 ease-in-out `}>
                Reset
              </p>
              {/* <li className=' p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                How to create new Account
              </li>

              <li className=' p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                How to create new Account
              </li>

              <li className=' p-2 rounded-sm cursor-pointer hover:bg-gray-300'>
                How to create new Account
              </li> */}

            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help
