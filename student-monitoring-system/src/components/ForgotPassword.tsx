import React, { useState } from 'react'
import DOMAIN from '../config/config';

const ForgotPassword = () => {
    const [message, setMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")

    const [email, setEmail] = useState<string>("")
    const [otp, setOtp] = useState<string>("")
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [step, setStep] = useState<number>(1)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // send otp
    const sendOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DOMAIN}/send-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email })
            })
            const data = await response.json()

            if (!response.ok) {
                setErrorMessage(data.message)
                setMessage("")
                return
            }
            console.log(data.message)
            // setMessage(data.message)
            alert(data.message)
            setErrorMessage("")
            setStep(2)
        } catch (error) {
            console.log(error)
        }
        // console.log("Form Submitted", formData);
    };

    // verify otp
    const verifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DOMAIN}/verify-otp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp })
            })
            const data = await response.json()

            if (!response.ok) {
                setErrorMessage(data.message)
                setMessage("")
                return
            }
            console.log(data.message)
            // setMessage(data.message)
            alert(data.message)
            setErrorMessage("")
            setStep(3)
        } catch (error) {
            console.log(error)
        }
        // console.log("Form Submitted", formData);
    };


    // forgot password
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${DOMAIN}/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json()

            if (!response.ok) {
                setErrorMessage(data)
                setMessage("")
                return
            }


            console.log(data)
            setMessage(data)
            setErrorMessage("")
        } catch (error) {
            console.log(error)
        }
        // console.log("Form Submitted", formData);
    };
    return (
        <div className="flex justify-center items-center h-screen">

            {step === 1 && <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">Send One Time Password</h2>
                {message ? <h2 className="text-lg text-center bg-green-500 py-2 my-2.5 rounded-md">{message}</h2> : ''}
                {errorMessage ? <h2 className="text-lg text-center bg-red-500 py-2 my-2.5 rounded-md">{errorMessage}</h2> : ''}
                <form onSubmit={sendOTP} className="space-y-4">

                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />

                    <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-700">Send OTP</button>
                </form>

            </div>}


            {step === 2 && <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">Verify One Time Password</h2>
                {message ? <h2 className="text-lg text-center bg-green-500 py-2 my-2.5 rounded-md">{message}</h2> : ''}
                {errorMessage ? <h2 className="text-lg text-center bg-red-500 py-2 my-2.5 rounded-md">{errorMessage}</h2> : ''}
                <form onSubmit={verifyOTP} className="space-y-4">

                    <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" />
                    <input type="text" name="otp" placeholder="One Time Password" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 border rounded" />
                    <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-700">Verify OTP</button>
                </form>

            </div>}

            {step === 3 && <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
                <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
                {message ? <h2 className="text-lg text-center bg-green-500 py-2 my-2.5 rounded-md">{message}</h2> : ''}
                {errorMessage ? <h2 className="text-lg text-center bg-red-500 py-2 my-2.5 rounded-md">{errorMessage}</h2> : ''}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
                    <input type="password" name="newPassword" placeholder="New Password" value={formData.newPassword} onChange={handleChange} required className="w-full p-2 border rounded" />
                    <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-2 border rounded" />

                    <button type="submit" className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-700">Submit</button>
                </form>
            </div>}
        </div>
    )
}

export default ForgotPassword
