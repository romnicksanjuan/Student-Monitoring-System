import { useEffect, useState, useRef } from "react";
import SideBar from "../SideBar";
import TopBar from "../TopBar";
import DOMAIN from "../../config/config";
import { MdPrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import logo from '../../images/senior-high.png'

interface Att {
  student_id: string
  first_name: string
  last_name: string,
  time_In: string,
  time_Out: string;
}

const Attendance = () => {
  const [attendance, setAttendance] = useState<Att[]>([])
  const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0])
  const [errorMessage, setErrorMessage] = useState<string>("");
  const contentRef = useRef(null)


  // console.log(date)
  useEffect(() => {
    const attendance = async () => {
      try {
        const response = await fetch(`${DOMAIN}/attendance/${date}`, {
          method: "GET"
        })

        const data = await response.json()
        if (!response.ok) {
          // console.log(response.statusText)
          setErrorMessage(data)
          return
        }

        setAttendance(data)
        setErrorMessage("")
        // console.log(data)
      } catch (error) {
        console.log(error)
      }
    }

    attendance()
  }, [date])


  // print 
  const reactToPrintFn = useReactToPrint({
    contentRef: contentRef,
    documentTitle: 'Print', // Optional: name of the printed file
    // onAfterPrint: () => alert('Print success!'), 
  });


  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">

          <div className="flex justify-start items-center gap-5">
            <div>
              <input type="date" className="h-10 w-40 border-1 border-gray-900 p-5 text-gray-900 rounded-md bg-amber-300 my-3"
                value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div onClick={() => reactToPrintFn()}>
              < MdPrint color="black" size={30} />
            </div>
          </div>
          <div ref={contentRef} className="">
            <div className="hidden  print:flex justify-center items-center gap-3 mt-1.5 mb-6">
              <img className="w-16 h-auto" src={logo} alt="" />
              <h2 className="font-bold text-2xl">STUDENT SERVICE ATTENDANCE</h2>
            </div>
            <div className="w-full print:w-[90%] mx-auto" >
              <h2 className="hidden print:flex print:mb-2 font-bold">Attendance Report</h2>
              <table className="w-full border-collapse border border-gray-300
             mx-auto  print:text-[0.50rem]
            ">
                <thead>
                  <tr className="bg-gray-200 cursor-pointer">
                    <th className="border border-gray-300 px-4 py-2 text-left">Student ID</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Time In</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Time Out</th>

                  </tr>
                </thead>
                <tbody>
                  {!errorMessage ?
                    attendance.map((a, index) => (

                      <tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2 text-left">{a.student_id}</td>
                        <td className="border border-gray-300 px-4 py-2 text-left">{a.first_name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-left">{a.last_name}</td>
                        <td className={`border border-gray-300 px-4 py-2 ${a.time_In ? "text-left" : "text-center"}`}>{a.time_In ? a.time_In : "-"}</td>
                        <td className={`border border-gray-300 px-4 py-2 ${a.time_Out ? "text-left" : "text-center"}`}>{a.time_Out ? a.time_Out : "-"}</td>
                      </tr>
                    )) : <tr><td></td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          {errorMessage && <p className="text-lg text-center mt-5">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
