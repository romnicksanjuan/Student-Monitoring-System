import { BrowserRouter,Routes,Route } from "react-router-dom"
import Create from "./components/Create"
import Login from "./components/Login"
import AdminDashboard from "./components/admin-components/AdminDashboard"
import DriverDashboard from "./components/bus-driver components/DriverDashboard"

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="create-user" element={< Create />}/>
        <Route path="login-user" element={< Login />}/>
        <Route path="admin/dashboard" element={< AdminDashboard />}/>
        <Route path="bus-driver/dashboard" element={< DriverDashboard />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
