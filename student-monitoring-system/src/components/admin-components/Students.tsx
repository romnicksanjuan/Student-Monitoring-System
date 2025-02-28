import SideBar from "../SideBar";
import TopBar from "../TopBar";

const Students = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">
          <table className="w-full bg-gray-300 border-collapse border border-gray-300 mt-3">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Student Id</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                <th className="border border-gray-300 px-4 py-2 text-left">First Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Last Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Gender</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Birth Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Age</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>

              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
