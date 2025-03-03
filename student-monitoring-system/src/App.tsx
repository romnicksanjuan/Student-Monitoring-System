import { BrowserRouter,Routes,Route } from "react-router-dom"
import Create from "./components/Create"
import Login from "./components/Login"
import AdminDashboard from "./components/admin-components/AdminDashboard"
import DriverDashboard from "./components/bus-driver components/DriverDashboard"
import BusManifest from "./components/admin-components/BusManifest"
import Attendance from "./components/admin-components/Attendance"
import Students from "./components/admin-components/Students"
import StudentForm from "./components/admin-components/StudentForm"
import BusManifestForm from "./components/admin-components/BusManifestForm"
import ForgotPassword from "./components/ForgotPassword"
import UpdateStudent from "./components/admin-components/UpdateStudent"
import UpdateManifest from "./components/admin-components/UpdateManifest"

BusManifest

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="create-user" element={< Create />}/>
        <Route path="/" element={< Login />}/>
        <Route path="admin/dashboard" element={< AdminDashboard />}/>
        <Route path="bus-driver/dashboard" element={< DriverDashboard />}/>
        <Route path="bus-manifest" element={<BusManifest />}/>
        <Route path="attendance" element={<Attendance />}/>
        <Route path="students" element={<Students />}/>
        <Route path="students/create" element={<StudentForm />}/>
        <Route path="manifest/create" element={<BusManifestForm />}/>
        <Route path="admin/forgot-password" element={<ForgotPassword />}/>
        <Route path="update-student" element={< UpdateStudent />}/>
        <Route path="update-manifest" element={< UpdateManifest />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
