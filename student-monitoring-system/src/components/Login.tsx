import { useEffect, useState } from "react";
import DOMAIN from "../config/config";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "./DecodeToken";

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
        <div className="h-screen w-full xl:bg-yellow-500 xl:flex xl:justify-center xl:items-center ">
            <form onSubmit={handleSubmit} className="xl:bg-white xl:p-4 xl:border xl:rounded-md xl:w-xl ">
                <h2 className="xl:text-2xl xl:text-bold xl:text-center">Login User</h2>
                {errorMessage ? <p className="text-white text-center bg-red-500 py-1 text-lg">{errorMessage}</p> : ""}

                <label className="block mb-2">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>

                <label className="block mb-2">
                    Password:
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>

                <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded-md">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
