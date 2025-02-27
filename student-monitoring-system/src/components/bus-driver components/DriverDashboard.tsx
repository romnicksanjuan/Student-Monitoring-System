import { useEffect, useState } from "react"
import axios from "axios"
import DOMAIN from "../../config/config"

interface ManifestList {
  busCapacity: number
  busCode: string
  busDriverName: string
  busDriverToken: string
  busPlateNumber: string,
  createdAt: string;
  studentList: studentDetails[]
}

interface studentDetails {
  studentID: string
  firstName: string
  lastName: string
  dateOfBirth: string
  age: 31,
  gender: string
  mobileNumber: string
  email: string
  address: string
  guardianName: string
  guardianMobileNumber: string
  guardianRelationship: string
  generatedSpeechUrl: string
  createdAt: string
  updatedAt: string
}
const DriverDashboard = () => {
  const [studentList, setStudentList] = useState<ManifestList[]>([])


  useEffect(() => {
    const getList = async () => {
      try {
        const list = await axios.get(`${DOMAIN}/api/bus-manifest/list`)
        console.log(list)
        // setStudentList()
      } catch (error) {
        console.log(error)
      }
    }
    getList()
  }, [])
  return (
    <div>
      driver
    </div>
  )
}

export default DriverDashboard

