import { BrowserRouter,Routes,Route } from "react-router-dom"
import Create from "./components/Create"
import Login from "./components/Login"
import AdminDashboard from "./components/admin-components/AdminDashboard"
import DriverDashboard from "./components/bus-driver components/DriverDashboard"
import BusManifest from "./components/admin-components/BusManifest"
import Attendance from "./components/admin-components/Attendance"
import Students from "./components/admin-components/Students"

BusManifest

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="create-user" element={< Create />}/>
        <Route path="login-user" element={< Login />}/>
        <Route path="admin/dashboard" element={< AdminDashboard />}/>
        <Route path="bus-driver/dashboard" element={< DriverDashboard />}/>
        <Route path="bus-manifest" element={<BusManifest />}/>
        <Route path="attendance" element={<Attendance />}/>
        <Route path="students" element={<Students />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
