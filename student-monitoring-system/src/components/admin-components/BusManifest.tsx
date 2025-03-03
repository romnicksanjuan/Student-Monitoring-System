import { useEffect, useState } from "react"
import SideBar from "../SideBar"
import TopBar from "../TopBar"
import DOMAIN from "../../config/config.ts"
import { useNavigate } from "react-router-dom"

interface Manifest {
    busCapacity: number;
    busCode: number;
    busDriverName: string;
    busPlateNumber: string;
    email: string;
    _id: string
}



const BusManifest = () => {
    const navigate = useNavigate()

    const [manifest, setManifest] = useState<Manifest[]>([])



    useEffect(() => {
        const getManifest = async () => {
            try {
                const response = await fetch(`${DOMAIN}/bus-manifest/list`)

                const data: Manifest[] = await response.json()

                if (!response.ok) {
                    console.log(response.statusText)
                    return
                }
                setManifest(data)
            } catch (error) {
                console.log(error)
            }
        }

        getManifest()
    }, [])
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1">
                <TopBar />
                <div className="p-5">
                    {/* <h2 className="text-center text-3xl mb-3">Bus Manifest</h2> */}
                    <div className="w-full my-3 flex justify-end">
                      
                        <button className="h-10 w-25 text-md text-white bg-gray-900 rounded-md" onClick={() => navigate("/manifest/create")}>Create</button>

                    </div>
                    <h2 className="text-xl text-gray-900 font-bold">Bus Manifest List</h2>
                    <table className="w-full border-collapse border border-gray-300 mt-3">
                        <thead>
                            <tr className="bg-gray-200 cursor-pointer">
                                <th className="border border-gray-300 px-4 py-2 text-left">Bus Code</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Driver Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Bus Plate Number</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Bus Capacity</th>
                                <th className="border border-gray-300 px-4 py-2 text-left">Email</th>

                            </tr>
                        </thead>
                        <tbody>
                            {manifest ? manifest.map(bus => (
                                <tr key={bus._id} className="hover:bg-gray-100">
                                    <td className="border border-gray-300 px-4 py-2">{bus.busCode}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.busDriverName}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.busPlateNumber}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.busCapacity}</td>
                                    <td className="border border-gray-300 px-4 py-2">{bus.email}</td>
                                </tr>
                            )) : ""}

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default BusManifest
