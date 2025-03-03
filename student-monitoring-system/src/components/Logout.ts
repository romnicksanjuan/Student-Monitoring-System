import { useNavigate } from "react-router-dom"

const Logout = () => {
    const navigate = useNavigate()
    // Clear all data
    if (!window.confirm("Do you want to log out?")) return
    localStorage.clear();
    navigate("/")
}

export default Logout
