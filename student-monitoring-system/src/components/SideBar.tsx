import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const SideBar = () => {
  const navigate = useNavigate()


  const handleLogout = () => {
    if (!window.confirm("Do you want to log out?")) return;
    localStorage.clear()
    navigate("/");
  };
  return (
    <div className="bg-gray-900 text-white h-screen w-62 p-5">
      <h1 className="text-3xl font-bold my-4 px-2">Side Bar</h1>

      <ul className="space-y-4">
        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link className="" to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link className="" to="/bus-manifest">Bus Manifest</Link>
        </li>

        <li className="hover:bg-gray-700 p-2 rounded  text-xl text-amber-300">
          <Link to="/attendance">Attendance List</Link>
        </li>

        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link to="/students">Student List</Link>
        </li>

        <li onClick={() => handleLogout()} className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link to="">Log Out</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
