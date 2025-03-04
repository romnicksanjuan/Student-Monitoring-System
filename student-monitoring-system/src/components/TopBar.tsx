import logo from "../images/senior-high.png"
const TopBar = () => {
    return (
        <div className="h-auto flex bg-amber-300">
            <div className="flex justify-between items-center px-3 w-full">
                <img src={logo} alt="" className="w-28 h-auto drop-shadow-[0_0_3px_white]" />
                <h2 className="text-4xl font-bold text-gray-900 text-center">STUDENT SERVICE MONITORING SYSTEM</h2>
                {/* <img src={logo} alt="" className="w-32 h-auto" /> */}
                <div className="w-32 h-32">

                </div>
            </div>
        </div>
    )
}

export default TopBar
