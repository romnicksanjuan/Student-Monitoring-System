import { BrowserRouter,Routes,Route } from "react-router-dom"
import Create from "./components/Create"
import Login from "./components/Login"
import AdminDashboard from "./components/admin-components/AdminDashboard"
import BusManifest from "./components/admin-components/BusManifest"
import Attendance from "./components/admin-components/Attendance"
import Students from "./components/admin-components/Students"
import StudentForm from "./components/admin-components/StudentForm"
import BusManifestForm from "./components/admin-components/BusManifestForm"
import ForgotPassword from "./components/ForgotPassword"
import UpdateStudent from "./components/admin-components/UpdateStudent"
import UpdateManifest from "./components/admin-components/UpdateManifest"
import Setting from "./components/admin-components/Setting"
import Help from "./components/admin-components/Help"

BusManifest

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="create-user" element={< Create />}/>
        <Route path="/" element={< Login />}/>
        <Route path="admin/dashboard" element={< AdminDashboard />}/>
        <Route path="bus-manifest" element={<BusManifest />}/>
        <Route path="attendance" element={<Attendance />}/>
        <Route path="students" element={<Students />}/>
        <Route path="students/create" element={<StudentForm />}/>
        <Route path="manifest/create" element={<BusManifestForm />}/>
        <Route path="admin/forgot-password" element={<ForgotPassword />}/>
        <Route path="update-student" element={< UpdateStudent />}/>
        <Route path="update-manifest" element={< UpdateManifest />}/>
        <Route path="setting" element={< Setting />}/>
        <Route path="help" element={< Help />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
