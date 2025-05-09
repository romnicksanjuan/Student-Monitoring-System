const jwt = require("jsonwebtoken");
const User = require("../model/user-model");
const { sendOtp } = require("../utils/otpSender");
const Otp = require('../model/otp.js');
const { message } = require("../utils/utils");
// create user
const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    console.log(firstName, lastName, email, password,)
    try {
        const findEmail = await User.findOne({ email })
        if (findEmail) {
            console.log(findEmail)
            res.status(400).json({ message: "User is already registered with this email" })
            return
        }

        const newUser = new User({ firstName, lastName, email, password, role: "Admin" })
        await newUser.save()
        res.status(200).json({ message: "User Created Succesfull!" })
    } catch (error) {
        console.log(error)
    }
}

// login user
const loginUser = async (req, res) => {

    const { email, password } = req.body
    const secretKey = "RomnickPogi"
    console.log(email, password)
    try {
        const findEmail = await User.findOne({ email })
        if (!findEmail) {
            res.status(404).json("Invalid Credentials")
            return;
        }

        if (findEmail.password !== password) {
            res.status(400).json("Invalid Credentials")
            return
        }

        const payload = {
            userId: findEmail._id,
            role: findEmail.role,
            email: findEmail.email,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: "10h" });

        res.status(200).json({ message: "Login Successfull", token: token })

    } catch (error) {
        console.log(error)
    }
}

// user list by role
const userListByRole = async (req, res) => {
    const { role } = req.query
    console.log(role)
    try {

        if (!role) {
            return res.json("role is required")
        }
        const getUserList = await User.find({ role })
        res.status(200).json(getUserList)

    } catch (error) {
        console.log(error)
    }
}

// get by email
const getUserByEmail = async (req, res) => {
    const { email } = req.params
    // console.log(email)
    try {
        if (!email) {
            res.json("email is required")
            return
        }
        const getUser = await User.findOne({ email })
        if (!getUser) {
            res.status(404).json("email not found")
            return
        }
        console.log(getUser)
        res.status(200).json(getUser)
    } catch (error) {
        console.log(error)
    }
}
// update user
const updateUser = async (req, res) => {
    const { id } = req.params
    const {
        firstName,
        lastName,
        email,
        phoneNumber,
        date,
        address
    } = req.body;



    const file = req.file

    console.log('file:', file)
    try {
        if (!email || !firstName || !lastName) {
            return res.json("all fields are required!")
        }

        await User.findByIdAndUpdate(id, {
            email, firstName, lastName, phone_number: phoneNumber,
            date_of_birth: date, address,
            ...file && {
                profile: {
                    data: file.buffer,
                    contentType: file.mimetype,
                },
            },
        }, { new: true })

        res.json({ success: true, message: "Your Information has been Updated Successfully" })
    } catch (error) {
        console.log(error)
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        const delete_user = await User.findByIdAndDelete(id)
        console.log("user deleted Successfully:", delete_user)
        res.json("User deleted Successfully")
    } catch (error) {
        console.log(error)
    }
}
// user change password
const changePassoword = async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body

    console.log(email, oldPassword, newPassword, confirmPassword)
    try {
        if (email === '' || oldPassword === '' || newPassword === '' || confirmPassword === '') {
            res.status(401).json({ message: "All fields are required" })
            return
        }
        const findEmail = await User.findOne({ email })

        if (!findEmail) {
            res.json({ message: "invalid Credentials" })
            return
        }

        if (findEmail.password !== oldPassword) {
            res.json({ message: "invalid Credentials" })
            return
        }

        findEmail.password = newPassword
        await findEmail.save()

        res.json({ message: "Password Change Successfull" })

    } catch (error) {
        console.log(error)
    }
}


// send otp
const sendOTPFunction = async (req, res) => {
    const { email } = req.body
    console.log(email)
    await sendOtp(email)
    res.status(200).json({ message: "We've sent you an email containing a One-Time Password (OTP). Please check your inbox to proceed. " });
}

const forgotPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body
    console.log(email, newPassword, confirmPassword)
    try {
        const findByEmail = await User.findOne({ email })

        // console.log(findByEmail)

        if (!findByEmail) {
            res.status(404).json("Invalid Credentials")
            return
        }

        if (newPassword !== confirmPassword) {
            res.status(400).json("New Password and Confirm Password doesn't match")
            return
        }
        const changePassoword = await User.findOneAndUpdate({ email }, { password: newPassword },  // Update
            { new: true }) // Return the updated document)

        console.log(changePassoword)

        res.status(200).json("Password Reset Successfull")
    } catch (error) {
        console.log(error)
    }
}

// verify otp
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body

    if (!email === '' || otp === '') {

        return console.log('error')
        // res.status(400).josn({success: false, message: ''})
    }

    const verify = await Otp.findOne({ email, otp })

    if (!verify) {
        return res.status(500).json({ success: false, message: 'Cannot Verify OTP' })
    }
    res.status(200).json({ success: true, message: 'OTP has been verified successfully.' })
}

// update information
// const updateInfo
module.exports = {
    createUser, loginUser, userListByRole, getUserByEmail,
    updateUser, deleteUser, changePassoword, forgotPassword, sendOTPFunction, verifyOtp
}