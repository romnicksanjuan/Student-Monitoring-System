import { useEffect, useState } from "react";
import DOMAIN from "../config/config";

const Create = () => {

    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    // const [role, setRole] = useState<string>("")
   

    const [Message, setMessage] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (firstName === "" || lastName === "" || email === "" || password === "") {
            setErrorMessage("All fields are required!")

            return
        }

        try {
            const response = await fetch(`${DOMAIN}/user/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstName, lastName, email, password })
            })
            const data = await response.json()
            if (!response.ok) {
                setErrorMessage(data.message)
                setMessage("")
                console.log("error:", data)
                return
            }
            console.log(response)
            setMessage(data.message)
            setErrorMessage("")
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        setErrorMessage("")
        setMessage("")
    }, [firstName, lastName, email, password])


    return (
        <div className="h-screen w-full xl:bg-yellow-500 xl:flex xl:justify-center xl:items-center ">
            <form onSubmit={handleSubmit} className="xl:bg-white xl:p-4 xl:border xl:rounded-md xl:w-xl ">
                {Message ? <p className="xl:text-white xl:text-center xl:bg-green-500 xl:py-2 xl:text-lg">{Message}</p> : ""}
                {errorMessage ? <p className="xl:text-white xl:text-center xl:bg-red-500 xl:py-2 xl:text-lg">{errorMessage}</p> : ""}
                <h2 className="xl:text-2xl xl:text-bold xl:text-center">Create Admin Account</h2>
                <label className="block mb-2">
                    FirstName:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>

                <label className="block mb-2">
                    LastName:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="border p-2 w-full"
                    />
                </label>

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

export default Create;
