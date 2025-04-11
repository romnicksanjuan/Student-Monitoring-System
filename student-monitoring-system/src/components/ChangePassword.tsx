import React, { useState } from 'react'
import DOMAIN from '../config/config'

const ChangePassword = () => {

    const [email, setEmail] = useState<string>('')
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [successMessage, setSuccessMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const handleChanePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await fetch(`${DOMAIN}/user/change-password`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, oldPassword, newPassword, confirmPassword })
            })
            const data = await response.json()

            if (!response.ok) {
                console.log(data)
                setErrorMessage(data.message)
                setSuccessMessage('')

                setTimeout(() => {
                    setErrorMessage('');
                  }, 5000);
                return
            }
            console.log(data)
            setErrorMessage('')
            setSuccessMessage(data.message)

            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            setEmail('')
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='p-5 grid place-items-center  h-[500px]'>
            <form onSubmit={handleChanePassword} className='w-lg bg-amber-400 p-5 grid gap-1 rounded-sm'>
                <h2 className='text-center text-xl font-bold'>Change Password</h2>
                {successMessage ? <p className='text-center text-white bg-green-500 rounded-sm py-2 px-2'>{successMessage}</p> : ''}
                {errorMessage ? <p className='text-center text-white bg-red-500 rounded-sm py-2 px-2'>{errorMessage}</p> : ''}
                <div>
                    <label htmlFor="email" className='text-black text-lg'>Email:</label><br />
                    <input type="email" id='email' className='px-2 py-2 w-full outline-0 border-2 border-gray-900 rounded-sm'
                        value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                </div>

                <div>
                    <label htmlFor="old-password" className='text-black text-lg'>Old Password:</label><br />
                    <input type="text" id='old-password' className='px-2 py-2 w-full outline-0 border-2 border-gray-900 rounded-sm'
                        value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} placeholder='Enter Old Password' />
                </div>

                <div>
                    <label htmlFor="new-password" className='text-black text-lg'>New Password:</label><br />
                    <input type="password" id='new-password' className='px-2 py-2 w-full outline-0 border-2 border-gray-900 rounded-sm'
                        value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter New Password' />
                </div>

                <div>
                    <label htmlFor="confirm-password" className='text-black text-lg'>Confirm Password:</label><br />
                    <input type="password" id='confirm-password' className='px-2 py-2 w-full outline-0 border-2 border-gray-900 rounded-sm'
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Enter Confirm Password' />
                </div>

                <button type='submit' className='text-white cursor-pointer px-2 py-2 w-full outline-0 border-2 bg-gray-900 rounded-sm mt-2 hover:bg-gray-700'>Submit</button>
            </form>
        </div>
    )
}

export default ChangePassword
