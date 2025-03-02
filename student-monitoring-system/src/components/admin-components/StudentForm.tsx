import { useState } from "react";

const StudentForm = () => {
    const [formData, setFormData] = useState({
        student_id: "",
        email: "",
        firstname: "",
        lastname: "",
        gender: "",
        date_of_birth: "",
        age: "",
        address: "",
        guardian_name: "",
        guardian_mobile_number: "",
        guardian_relationship: "",
        guardian_lastname: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted", formData);
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Student Registration Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="student_id" placeholder="Student ID" value={formData.student_id} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="guardian_name" placeholder="Guardian Name" value={formData.guardian_name} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="number" name="guardian_mobile_number" placeholder="Guardian Mobile Number" value={formData.guardian_mobile_number} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="guardian_relationship" placeholder="Guardian Relationship" value={formData.guardian_relationship} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="text" name="guardian_lastname" placeholder="Guardian Last Name" value={formData.guardian_lastname} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-700">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
