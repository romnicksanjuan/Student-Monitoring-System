import logo from "../images/seniorhigh-logo.jpg"
const TopBar = () => {
    return (
        <div className="h-auto flex bg-amber-300">
            <div className="flex justify-between items-center p-3 w-full">
                <img src={logo} alt="" className="w-28 h-auto" />
                <h2 className="text-4xl font-bold text-gray-900 text-center">STUDENT SERVICE MONITORING SYSTEM</h2>
                {/* <img src={logo} alt="" className="w-32 h-auto" /> */}
                <div className="w-32 h-32">

                </div>
            </div>
        </div>
    )
}

export default TopBar
