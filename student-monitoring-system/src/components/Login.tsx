import { useEffect, useState } from "react";
import DOMAIN from "../config/config";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "./DecodeToken";
import adminBG from "../images/adminBG.jpg"

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState("")
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (email === "" || password === "") {
            setErrorMessage("All fields are required")
            return
        }
        try {
            const response = await fetch(`${DOMAIN}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                setErrorMessage(data)
                console.log("error:", data)
                return;
            }
            console.log("data", data)
            localStorage.setItem("token", data.token)

            const decodedToken = decodeToken(data.token)

            if (decodedToken?.role === "Admin") {
                navigate("/admin/dashboard")
                return;
            }

            // if (decodedToken?.role === "BusDriver") {
            //     navigate("/bus-driver/dashboard")
            //     return;
            // }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setErrorMessage("")
    }, [email, password])


    return (
        <div className="h-screen w-ful xl:flex xl:justify-center xl:items-center bg-cover bg-center"
            style={{ backgroundImage: `url(https://thumbs.dreamstime.com/b/whimsical-d-cartoon-school-bus-colorful-city-road-back-to-cute-style-drives-down-street-sign-surroundings-365440818.jpg)` }}>
            <form onSubmit={handleSubmit} className="xl:bg-white/50 xl:p-4 xl:border-2 border-amber-900 xl:rounded-md xl:w-xl ">
                <h2 className="xl:text-2xl xl:text-bold xl:text-center">Login User</h2>
                {errorMessage ? <p className="text-white text-center bg-red-500 py-1 text-lg">{errorMessage}</p> : ""}

                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-amber-900 p-2 w-full rounded-md mb-5"
                    />
                </label>

                <label className="block mb-2">
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-amber-900 p-2 w-full rounded-md"
                    />
                </label>
                <p onClick={() => navigate("/admin/forgot-password")} className="text-md my-2 cursor-pointer">Forgot Password</p>
                <p className="text-md my-2 cursor-pointer">Dont have account yet? <span onClick={() => navigate("/create-user")} className="text-blue-900">Sign Up</span></p>
                <button type="submit" className="bg-gray-700 hover:bg-gray-900  text-white p-2 w-full rounded-md cursor-pointer">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
