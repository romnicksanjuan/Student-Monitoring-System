import { useState } from "react";
import DOMAIN from "../../config/config";

const BusManifestForm = () => {
    const [message, setMessage] = useState<string>("")
    const [formData, setFormData] = useState({
        busPlateNumber: "",
        busCapacity: "",
        busDriverName: "",
        email: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DOMAIN}/bus-manifest/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                setMessage(response.statusText)
                return
            }

            const data = await response.json()
            console.log(data)
            setMessage(data)
        } catch (error) {
            console.log(error)
        }
        // console.log("Form Submitted", formData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Manifest Registration Form</h2>
                {message ? <h2 className="text-lg text-center bg-green-500 py-2 my-2.5 rounded-md">{message}</h2> : ''}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="busPlateNumber" placeholder="Bus PlateNumber" value={formData.busPlateNumber} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="busDriverName" placeholder="Driver Name" value={formData.busDriverName} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="busCapacity" placeholder="Bus Capacity" value={formData.busCapacity} onChange={handleChange} required className="w-full p-2 border rounded" />
             
                    <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-700">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default BusManifestForm;
