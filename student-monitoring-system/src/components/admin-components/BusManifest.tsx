import { useEffect, useState } from "react"
import SideBar from "../SideBar"
import TopBar from "../TopBar"
import DOMAIN from "../../config/config.ts"
import { useNavigate } from "react-router-dom"

interface Manifest {
    busCapacity: number;
    busCode: number;
    busDriverName: string;
    busPlateNumber: string;
    email: string;
    _id: string;
    studentList: string[]
}
interface StudList {
    student_id: string;
    firstname: string,
    lastname: string;
    strand: string;
    _id: string
}



const BusManifest = () => {
    const navigate = useNavigate()

    const [man, setMan] = useState<Manifest | null>(null)
    const [isClick, setIsClick] = useState<boolean>(false)

    const [manifest, setManifest] = useState<Manifest[]>([])
    const [studList, setStudList] = useState<StudList[]>()
    const [manifestId, setManifestId] = useState<any>("")
    const [studentId, setStudentId] = useState<any>("")
    // console.log(student)
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    useEffect(() => {
        const getManifest = async () => {
            try {
                const response = await fetch(`${DOMAIN}/bus-manifest/list`)

                const data = await response.json()

                if (!response.ok) {
                    console.log(response.statusText)
                    return
                }
                setManifest(data.getList)
                console.log("stud list:", data.findStudents)
                setStudList(data.findStudents)
            } catch (error) {
                console.log(error)
            }
        }

        getManifest()
    }, [])

    // update manifest
    const manifestDetails = (id?: string) => {
        setManifestId(id)
        setIsClick(!isClick)
        console.log("manifest id:", id)
        const findManifest = manifest.find(man => man._id.toString() === id)
        console.log(findManifest)
        setMan(findManifest ?? null)
    }



    // add student to bus manifest
    const addStudent = async (manifestId?: string) => {
        console.log(manifestId)
        try {
            const response = await fetch(`${DOMAIN}/bus-manifest/add-student/${manifestId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ studentId })
            })
            const data = await response.json()
            if (!response.ok) {
                console.log(data)
                setErrorMessage(data)
                setSuccessMessage("")
                return;
            }
            console.log(data)
            setSuccessMessage(data)
            setErrorMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    // remove student
    const removeStudent = async (manifestId?: string, studentId?: string) => {
        console.log(manifestId)
        if (!window.confirm("Do you want to remove this student from manifest?")) return
        try {
            const response = await fetch(`${DOMAIN}/bus-manifest/remove-student/${manifestId}`, {
                method: "put",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({studentId})
            })

            const data = await response.json()
            setSuccessMessage(data.message)
            setErrorMessage("")
            setStudList(studList?.filter(s => s.student_id !== studentId))
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    const delManifest = async(busId: string) => {
        if (!window.confirm("Are you sure you want to delete this Bus Manifest?")) return
        try {
            const response = await fetch(`${DOMAIN}/bus-manifest/delete/${busId}`,{
                method:"DELETE"
            })
            const data = await response.json()
            setSuccessMessage(data)
            setErrorMessage("")
            setManifest(manifest.filter(m => m._id !== busId))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="flex min-h-screen relative">



            {isClick ?
                <div className="absolute bg-white w-4xl top-1/2 left-1/2 -translate-y-1/2 rounded-md
      -translate-x-1/2 py-10 px-5 border-2 border-gray-900">

                    <button onClick={() => setIsClick(!isClick)} className="font-bold text-2xl absolute right-2 top-1 p-2 cursor-pointer">x</button>
                    {successMessage ? <p className="text-center bg-green-500 rounded-sm py-2 text-white">{successMessage}</p> : ""}
                    {errorMessage ? <p className="text-center bg-red-500 rounded-sm py-2 text-white">{errorMessage}</p> : ""}
                    <h2 className="text-2xl font-bold mb-4">Manifest Details</h2>

                    <div className="grid grid-cols-2">
                        <h2 className="font-bold text-lg mb-2">Bus Capacity:
                            <span className="font-normal text-lg ml-2 text-gray-600">{man?.busCapacity}</span></h2>

                        <h2 className="font-bold text-lg mb-2">Bus Code:
                            <span className="font-normal text-lg ml-2 text-gray-600">{man?.busCode}</span></h2>

                        <h2 className="font-bold text-lg mb-2">Driver Name:
                            <span className="font-normal text-lg ml-2 text-gray-600">{man?.busDriverName}</span></h2>

                        <h2 className="font-bold text-lg mb-2">Bus Plate Number:
                            <span className="font-normal text-lg ml-2 text-gray-600">{man?.busPlateNumber}</span></h2>

                        <h2 className="font-bold text-lg mb-2">Email:
                            <span className="font-normal text-lg ml-2 text-gray-600">{man?.email}</span></h2>
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="font-bold text-lg mb-2">Student List</h2>
                            <div className="flex gap-3">
                                <input type="text" placeholder="Enter Student ID" className="p-2 border rounded-md" onChange={(e) => setStudentId(e.target.value)} />
                                <button type="submit" onClick={() => addStudent(man?._id.toString())}
                                    className="w-auto px-4 py-1 border hover:bg-green-600 bg-green-500 text-white text-lg rounded-sm">Add</button>
                            </div>
                        </div>
                        <table className="w-full border border-collapse">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 py-2 px-4">Student ID</th>
                                    <th className="border border-gray-300 py-2 px-4">First Name</th>
                                    <th className="border border-gray-300 py-2 px-4">Last Name</th>
                                    <th className="border border-gray-300 py-2 px-4">Strand</th>
                                    <th className="border border-gray-300 py-2 px-4">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {studList ?
                                    studList.map((s) => (
                                        <tr key={s._id} className="bg-gray-100 cursor-pointer">
                                            <td className="border border-gray-300 px-4 py-2 text-left">{s.student_id}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-left">{s.firstname}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-left">{s.lastname}</td>
                                            <td className="border border-gray-300 px-4 py-2 text-left">{s.strand}</td>
                                            <td className=" border border-gray-300 px-4 py-1 text-center">
                                                <button onClick={() => removeStudent(manifestId, s.student_id)} className="w-auto px-3 py-1 border bg-red-500 text-white text-lg rounded-sm">Remove</button>
                                            </td>
                                        </tr>
                                    ))
                                    : ""}
                            </tbody>
                        </table>
                    </div>

                </div>
                : ""}




            <SideBar />
            <div className="flex-1">
                <TopBar />
                <div className="p-5">
                    {/* <h2 className="text-center text-3xl mb-3">Bus Manifest</h2> */}
                    <div className="w-full my-3 flex justify-end">

                        <button className="h-10 w-25 text-md text-white bg-gray-900 rounded-md" onClick={() => navigate("/manifest/create")}>Create</button>

                    </div>
                    <h2 className="text-xl text-gray-900 font-bold">Bus Manifest List</h2>
                    {successMessage ? <p className="text-center bg-green-500 rounded-sm py-2 text-white">{successMessage}</p> : ""}
                    <table className="w-full border-collapse border border-gray-300 mt-3">
                        <thead>
                            <tr className="bg-gray-200 cursor-pointer">
                                <th className="border border-gray-300 px-4 py-2 text-left">Bus Code</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Driver Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Bus Plate Number</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Bus Capacity</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manifest ? manifest.map(bus => (
                                <tr key={bus._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td onClick={() => manifestDetails(bus._id)} className="border border-gray-300 px-4 py-2">{bus.busCode}</td>
                                    <td onClick={() => manifestDetails(bus._id)} className="border border-gray-300 px-4 py-2">{bus.busDriverName}</td>
                                    <td onClick={() => manifestDetails(bus._id)} className="border border-gray-300 px-4 py-2">{bus.busPlateNumber}</td>
                                    <td onClick={() => manifestDetails(bus._id)} className="border border-gray-300 px-4 py-2">{bus.busCapacity}</td>
                                    <td onClick={() => manifestDetails(bus._id)} className="border border-gray-300 px-4 py-2">{bus.email}</td>
                                    <td className=" grid grid-cols-2 gap-1.5 border border-gray-300 px-4 py-2 text-center">
                                        <button onClick={() => navigate("/update-manifest", {state: bus})} className="w-auto px-3 py-1 border bg-green-500 text-white text-lg rounded-sm">Update</button>
                                        <button onClick={() => delManifest(bus._id)} className="w-auto px-3 py-1 border bg-red-500 text-white text-lg rounded-sm">Delete</button>
                                    </td>
                                </tr>
                            )) : ""}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default BusManifest
