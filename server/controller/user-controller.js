const jwt = require("jsonwebtoken");
const User = require("../model/user-model");

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
            res.status(404).json("Email not found")
            return;
        }

        if (findEmail.password !== password) {
            res.status(400).json("Incorrect Password")
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
    const { email, firstName, lastName, role } = req.body
    try {
        if (!email || !firstName || !lastName || !role) {
            return res.json("all fields are required!")
        }
        await User.findByIdAndUpdate(id, { email, firstName, lastName, role }, { new: true })
        res.json("User Updated Successfully")
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
    const { email, oldPassword, newPassword } = req.body

    try {
        if (!email || !oldPassword || !newPassword) {
            res.json("all fields are required")
            return
        }
        const findEmail = await User.findOne({ email })

        if (!findEmail) {
            res.json("Email is invalid")
            return
        }

        if (findEmail.password !== oldPassword) {
            res.json("Password is incorrect")
            return
        }

        findEmail.password = newPassword
        await findEmail.save()

        res.json("User Updated Successfull")

    } catch (error) {
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    const { email, newPassword, confirmPassword } = req.body
    console.log(email, newPassword, confirmPassword)
    try {
        const findByEmail = await User.findOne({ email })

        // console.log(findByEmail)
        
        if (!findByEmail) {
            res.status(404).json("Email not found")
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

module.exports = {
    createUser, loginUser, userListByRole, getUserByEmail,
    updateUser, deleteUser, changePassoword, forgotPassword
}