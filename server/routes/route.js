const express = require('express')
const { registerStudent, updateStudent, getStudentList, getStudentById, deleteStudent } = require('../controller/student-controller.js')
const { createUser, loginUser, userListByRole, getUserByEmail, updateUser, deleteUser, changePassoword } = require('../controller/user-controller.js')
const { createManifest, getManifestList, getMnifest, updateManifest, manifestAddStudent, removeStudentFromManifest } = require('../controller/bus-manifest-controller.js')
const { attendance } = require('../controller/attendance-controller.js')
const test = require('../controller/arduino.js')

const router = express.Router()

// register student
router.post('/student/create', registerStudent)
// update user
router.put('/student/update/:id', updateStudent)
// get students list
router.get("/student/list", getStudentList)
// get student by student id
router.get("/student/:studentId", getStudentById)
// delete student
router.delete("/student/delete/:studentId", deleteStudent)

// create user
router.post('/user/create', createUser)
// login user
router.post('/user/login', loginUser)
// user by role
router.get("/user/list", userListByRole)
// get user by email
router.get("/user/:email", getUserByEmail)
// update user
router.put("/user/update/:id", updateUser)
// delete user
router.delete("/user/delete/:id", deleteUser)
// user change password
router.post("/user/change-password", changePassoword)


// create manifest
router.post("/bus-manifest/create", createManifest)
// get manifest list
router.get("/bus-manifest/list", getManifestList)
// get manifest by bus code
router.get("/bus-manifest/:busCode", getMnifest)
// update manifest
router.put("/bus-manifest/update/:id", updateManifest)
// manifest add student
router.put("/bus-manifest/add-student/:manifestId", manifestAddStudent)
// manifest remove student
router.put("/bus-manifest/remove-student/:manifestId", removeStudentFromManifest)


// attendance
router.post("/bus-manifest/student/attendance", attendance)



// arduino test
router.post("/test", test)


module.exports = router