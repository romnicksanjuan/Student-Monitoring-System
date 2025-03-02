import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import DOMAIN from "../../config/config";
import { useNavigate } from "react-router-dom";

interface GetStudents {
  address: string;
  age: number;
  date_of_birth: string;
  email: string;
  firstname: string;
  gender: string;
  guardian_lastname: string;
  guardian_mobile_number: number;
  guardian_name: string;
  guardian_relationship: string
  lastname: string;
  student_id: string;
  _id: number;
}

const Students = () => {
  const [studentList, setStudentList] = useState<GetStudents[]>([])
  const [query, setQuery] = useState<string>("");
  const navigate = useNavigate()

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await fetch(`${DOMAIN}/student/list`, {
          method: 'GET'
        })

        if (!response.ok) {
          console.log(response.statusText)
          return
        }

        const data: GetStudents[] = await response.json()
        if (query === "") {
          setStudentList(data)
          console.log(data)
        }

      } catch (error) {
        console.log(error)
      }
    }

    getStudents()
  }, [query])


  // search student 
  const searchStudent = async () => {
    try {
      const response = await fetch(`${DOMAIN}/query/student?firstname=${query}`, {
        method: 'GET'
      })
      if (!response.ok) {
        console.log(response.statusText)
        return
      }

      const data: GetStudents[] = await response.json()
      // console.log(data)
      setStudentList(data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">

          <div className="w-full my-3 flex justify-between">
            <div className="flex gap-3">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 w-sm pl-2 text-md py-5 rounded-md border-1 border-gray-900" placeholder="Search manifest..." />
              <button className="h-10 w-25 bg-gray-900 text-md rounded-md text-white" onClick={() => searchStudent()}>Search</button>
            </div>

            <button className="h-10 w-25 text-md text-white bg-gray-900 rounded-md" onClick={() => navigate("/students/create")}>Create</button>

          </div>

          <h2 className="text-xl text-gray-900 font-bold">Student List</h2>
          <table className="w-full  border-collapse border border-gray-300 mt-3">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Student Id</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Birth Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              {studentList ?
                studentList.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-100 cursor-pointer">
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.student_id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.firstname}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.lastname}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.gender}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.date_of_birth}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.age}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.address}</td>
                  </tr>
                ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
