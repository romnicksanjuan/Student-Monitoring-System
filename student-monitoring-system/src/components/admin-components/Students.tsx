import { useEffect, useState } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import DOMAIN from "../../config/config";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";

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
  strand: string;
}

const Students = () => {
  const [studentList, setStudentList] = useState<GetStudents[]>([])
  const [query, setQuery] = useState<string>("");
  const [student, setStudent] = useState<GetStudents | null>(null)
  const [isClick, setIsClick] = useState<boolean>(false)
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
          // console.log(data)
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


  // update student
  const studentDetails = (id: string) => {
    console.log(id)
    setIsClick(!isClick)

    const stud = studentList.find(s => s._id.toString() === id)

    setStudent(stud ?? null)
    // console.log("test: ", test)
  }



  // delete student
  const delStudent = async (id?: string) => {

    if (!window.confirm('Do you want to delete this student?')) {
      return
    }
    console.log(id)
    try {
      const response = await fetch(`${DOMAIN}/student/delete/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        return
      }

      const data = await response.json()
      console.log(data)
      setStudentList(studentList.filter(prev => prev._id.toString() !== id))
      setIsClick(!isClick)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex min-h-screen w-full relative">
      {isClick ?
        <div className="absolute z-10 bg-white w-2xl top-1/2 left-1/2 -translate-y-1/2 rounded-md
      -translate-x-1/2 py-10 px-5 border-2 border-gray-900">

          <button onClick={() => setIsClick(!isClick)} className="font-bold text-2xl absolute right-2 top-2 p-2 cursor-pointer">
            <MdCancel size={25} />
          </button>

          <h2 className="text-2xl font-bold mb-4">Student Details</h2>

          <h2 className="font-bold text-lg mb-2">Student ID:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.student_id}</span></h2>

          <h2 className="font-bold text-lg mb-2">Full Name:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.firstname + " " + student?.lastname}</span></h2>

          <h2 className="font-bold text-lg mb-2">Age:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.age}</span></h2>

          <h2 className="font-bold text-lg mb-2">Gender:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.gender}</span></h2>

          <h2 className="font-bold text-lg mb-2">Date of Birth:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.date_of_birth}</span></h2>

          <h2 className="font-bold text-lg mb-2">Email:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.email}</span></h2>

          <h2 className="font-bold text-lg mb-2">Address:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.address}</span></h2>

          <h2 className="font-bold text-lg mb-2">Section:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.strand}</span></h2>

          <h2 className="font-bold text-lg mb-2">Guardian First Name:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.guardian_name}</span></h2>

          <h2 className="font-bold text-lg mb-2">Guardian Last Name:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.guardian_lastname}</span></h2>

          <h2 className="font-bold text-lg mb-2">Guardian Relationships:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.guardian_relationship}</span></h2>

          <h2 className="font-bold text-lg">Guardian Mobile Number:
            <span className="font-normal text-lg ml-2 text-gray-600">{student?.guardian_mobile_number}</span></h2>

          <div className="w-full flex justify-around mt-5">
            <button onClick={() => navigate("/update-student", { state: student })} className="bg-amber-500 hover:bg-amber-600 text-black text-xl w-40 px-5 py-2 border rounded-md">Update</button>
            <button onClick={() => delStudent(student?._id.toString())} className="bg-red-500 hover:bg-red-600 text-black text-xl w-40 px-5 py-2 border rounded-md">Delete</button>
          </div>
        </div>
        : ""}


      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">

          <div className="w-full my-3 flex justify-between">
            <div className="flex gap-3">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 w-sm pl-2 text-md py-5 rounded-md border-1 border-gray-900" placeholder="Search student..." />
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
                <th className="border border-gray-300 px-4 py-2 text-left">Strand</th>
              </tr>
            </thead>
            <tbody>
              {studentList ?
                studentList.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-100 cursor-pointer" onClick={() => studentDetails(student._id.toString())}>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.student_id}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.email}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.firstname}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.lastname}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.gender}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.date_of_birth}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.age}</td>
                    <td className="border border-gray-300 px-4 py-2 text-left">{student.strand}</td>
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
