const User = require('../model/user-model')

const setting = async (req, res) => {
    const user = req.user
    // console.log('userrrr', user)

    const findUser = await User.findOne({ _id: user.userId, role: user.role }).lean()

    // console.log('find user:', findUser)
    if (!findUser) {
        return res.status(401).json({ message: "User not found" })
    }

    if (findUser.profile) {
        const base64 = findUser.profile.data.buffer.toString('base64')
        const mimetype = `data:image/jpeg;base64,${base64}`

        const result = {
            ...findUser,
            profile: mimetype,
            // date_of_birth: new Date(findUser.date_of_birth).toLocaleDateString('en-US', { day: 'numeric', timeZone:'Asia/Manila', month:'long', year:'numeric' })
        }


        res.status(201).json({ success: true, message: "success", user: result })
        return
    }

    res.status(201).json({ success: true, message: "success", user: findUser })

}

module.exports = { setting }