const express = require('express')
const { registerStudent, updateStudent, getStudentList, getStudentById, deleteStudent, studentCount, searchStudent } = require('../controller/student-controller.js')
const { createUser, loginUser, userListByRole, getUserByEmail, updateUser, deleteUser, changePassoword, forgotPassword } = require('../controller/user-controller.js')
const { createManifest, getManifestList, getMnifest, updateManifest, manifestAddStudent, removeStudentFromManifest, busManifestCount, delManifest } = require('../controller/bus-manifest-controller.js')
const { attendance, todaySAttendance, getAttendance } = require('../controller/attendance-controller.js')
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
router.delete("/student/delete/:id", deleteStudent)
// students count
router.get("/students-count", studentCount)
// search student
router.get('/query/student', searchStudent)

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
// forgot password
router.post("/forgot-password", forgotPassword)


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
// bus manifest count
router.get("/bus-manifest-count", busManifestCount)
// delete manifest
router.delete("/bus-manifest/delete/:manifestId", delManifest)


// attendance
router.post("/bus-manifest/student/attendance", attendance)
// attendance count
router.get("/today-attendance", todaySAttendance)
// get attendance
router.get("/attendance/:date", getAttendance)


// arduino test
router.post("/test", test)


module.exports = router