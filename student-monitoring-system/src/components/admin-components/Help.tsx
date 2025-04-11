// import React from 'react'
import TopBar from '../TopBar'
import SideBar from '../SideBar'

const Help = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (Fixed Width) */}
      <SideBar />

      {/* Main Content (Takes up remaining space) */}
      <div className="flex-1">
        <TopBar />
        <div className="p-5">
    help
        </div>
      </div>
    </div>
  )
}

export default Help
