import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="bg-gray-900 text-white h-screen w-64 p-5">
      <h1 className="text-3xl font-bold my-4 px-2">Side Bar</h1>

      <ul className="space-y-4">
        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link to="/admin/dashboard">Dashboard</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link to="/bus-manifest">Bus Manifest</Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link to="/attendance">Attendance</Link>
        </li>

        <li className="hover:bg-gray-700 p-2 rounded text-xl text-amber-300">
          <Link to="/students">Students</Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
