// import React from 'react'
import TopBar from '../TopBar'
import SideBar from '../SideBar'
import { MdLiveHelp } from "react-icons/md";
// import { useState } from 'react';


const Help = () => {
  // const [isClickCreate, setIsClickCreate] = useState<boolean>(false)
  // const [isResetPassword, setIsResetPassword] = useState<boolean>(false)
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

            <p className='font-bold mb-3'>For Admins</p>
            <p>
              Q1: How do I register a new student, driver, or parent?
            </p>
            <p>
              A. Go to the Side Bar
            </p>
            <p>
              B. For registering new driver click on "Bus Manifest".
            </p>

            <p> C. For registering new student click on "Students List"</p>
            <p>  D. Click Create Student, Create Driver</p>
            <p> E. Fill out all required fields and click Save.</p>

            <p>  Q2: How do I assign an RFID card to a student?</p>
            <p> A:
              Connect the RFID reader to your PC.
              Open the Command Prompt and type py auto_type.py.
              Scan the RFID card using the connected reader. The card ID will appear.
              Copy the card ID.
              When creating a new student in the Student Lists section, paste the card ID into the RFID field.
              Complete the rest of the student information and save.</p>

            <p> Q3: Where can I view student bus attendance logs?</p>
            <p> A:
              Go to the Attendance Lists
              You can filter records by student name, date, or route.</p>

            <p>
              Q4: How do I configure SMS notifications for parents?
            </p>
            <p>  A:
              Go to System Settings - SMS Configuration.
              Set up the Traccar SMS Gateway with the required credentials.
              Make sure each student profile includes the parent’s correct phone number.</p>

            <p>  Q5: What should I do if the RFID device is not recording?</p>
            <p> A:Check the hardware connection and power source.
              Restart the RFID device.
              If the issue persists, contact technical support.</p>

            <p>Q6: Can I edit or delete student or driver records?</p>
            <p>  A:Yes. Go to Bus Manifest Lists for drivers record, and go to Students List for student records, select the profile,  then choose Update or Delete.
            </p>

            <p>    Q7: How do I generate a report for a specific date?</p>
            <p>  A:
              Go to the Attendance Lists section and use the available filters (such as date range or student name). Once the desired data is displayed, click the Print button to generate a printable report.</p>

            <p> Q8: How can I change my password as an admin?</p>
            <p> A:
              As an admin, you can change your password by going to Settings from the sidebar. Select Change Password, enter your current password and the new one, then save the changes.
            </p>

            <p>   Q9: What should I do if I forget my password?</p>

            <p>
              A:
              On the Login page, click the Forgot Password link. An OTP (One-Time Password) will be sent to your registered admin email. Enter the OTP to verify your identity, then create a new password to regain access.
            </p>

            <p className='font-bold mb-3'>For Students</p>

            <p>
              Q1: What should I do if a student loses their RFID card?

            </p>
            <p>A: If a student loses their RFID card, inform the admin or teacher immediately. A replacement card will be issued, and the student's profile will be updated with the new ID.
            </p>
            <p>
              Q2: What if a student forgot to tap their RFID card?

            </p>
            <p>  A: If a student forgets to tap their RFID card, their attendance may not be recorded. The student should tap the card at the next boarding or exit to ensure their data is updated.
            </p>

            <p className='font-bold mb-3'>For Parents</p>
            <p>
              Q1: I did not receive an SMS notification when my child entered or exited the bus. What should I do?

            </p>
            <p> A: Ensure your mobile number is correctly registered in the system. If the number is correct and you're still not receiving notifications, check with the admin to verify if the system is functioning properly or if there are any issues with your registration.
            </p>
            <p>
              Q2: How can I update my mobile number for SMS notifications?

            </p>
            <p> A: You can update your mobile number by contacting the admin. They will assist in updating your details in the system to ensure you continue receiving SMS notifications.
            </p>


            <p className='font-bold mb-3'> For Drivers</p>

            <p>
              Q1: The RFID scanner is not detecting a student’s card. What should I do?

            </p>
            <p>  A: First, check if the scanner is properly connected and powered on. If it’s still not working, report the issue to the admin using the Contact Support form via the Help button, and they will assist with troubleshooting.
            </p>

            <p>
              Q2: How do I know when to start or end the trip if I’m unsure of the schedule?
            </p>
            <p> A: The driver should refer to the trip schedule and route details available in the system. If you're unsure, contact the admin for clarification on the scheduled times for each trip.
            </p>
          </div>
        </div>

        {/* <div className='flex justify-center my-6'>
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
            

            </ul>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Help
