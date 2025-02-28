import SideBar from "../SideBar";
import TopBar from "../TopBar";
import { FaUserFriends } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import DOMAIN from "../../config/config";
import { useEffect, useState } from "react";



const AdminDashboard = () => {
  const [studentCount, setStudentCount] = useState<number>(0)
  const [busManifestCount, setBusManifestCount] = useState<number>(0)
  const [todaysAttendance, setTodaysAttendance] = useState<number>(0)
  // students count
  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(`${DOMAIN}/students-count`, {
          method: 'GET'
        })
        if (!response.ok) {
          console.log(response.statusText)
          return
        }
        const data = await response.json()
        setStudentCount(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    getStudents()
  }, [])


  // bus manifest count
  useEffect(() => {
    const busManifestCount = async () => {
      try {
        const response = await fetch(`${DOMAIN}/bus-manifest-count`, {
          method: 'GET'
        })
        if (!response.ok) {
          console.log(response.statusText)
          return
        }
        const data = await response.json()
        setBusManifestCount(data.getBusManifestCount)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    busManifestCount()
  }, [])

  // today's attendance
  useEffect(() => {
    const getAttendance = async () => {
      try {
        const response = await fetch(`${DOMAIN}/today-attendance`, {
          method: "GET"
        })

        if (!response.ok) {
          console.log(response.status);
          return
        }

        const data = await response.json()
        setTodaysAttendance(data.total)
      } catch (error) {
        console.log(error)
      }
    }

    getAttendance()
  }, [])
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">

          <div className="gap-20 grid grid-cols-3  mx-auto">
            <div className="bg-gray-900 flex justify-between items-center h-36 p-5 rounded-xl">
              <div>
                <h2 className="text-xl text-white">Students</h2>
                <h2 className="text-xl text-white font-bold">{studentCount ? studentCount : 0}</h2>
              </div>
              <FaUserFriends color="white" size={45} />
            </div>

            <div className="bg-gray-900  h-36 flex justify-between items-center p-5 rounded-xl">
              <div>
                <h2 className="text-xl text-white">Bus Manifest</h2>
                <h2 className="text-xl text-white font-bold">{busManifestCount ? busManifestCount : 0}</h2>
              </div>
              <FaBus color="white" size={45} />
            </div>

            <div className="bg-gray-900  h-36 flex justify-between items-center p-5 rounded-xl">
              <div>
                <h2 className="text-xl text-white">Today's Attendance</h2>
                <h2 className="text-xl text-white font-bold">{todaysAttendance ? todaysAttendance : 0}</h2>
              </div>
              <FaCalendarCheck color="white" size={45} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
