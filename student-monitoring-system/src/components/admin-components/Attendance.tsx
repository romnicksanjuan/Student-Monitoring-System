import SideBar from "../SideBar";
import TopBar from "../TopBar";

const Attendance = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">
          <p>attendance</p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
