const BusAttendance = require("../model/attendance.js")
const busManifest = require("../model/bus-manifest.js")
const studentModel = require("../model/student-model")
const { smsApi } = require("../controller/smsController.js")


const accountSid = 'ACb04d5a4451ae767fdbbc002c27714980';
const authToken = '5bb97736f3ec03d2d20494682593c828';
const client = require('twilio')(accountSid, authToken);


const attendance = async (req, res) => {
    const { studentId, busCode } = req.body

    console.log(studentId, busCode)
    const currentDate = new Date().setHours(0, 0, 0, 0);
    // console.log("currentDate:", currentDate)
    try {
        const findStudent = await studentModel.findOne({ student_id: studentId })
        if (!findStudent) {
            res.status(404).json({
                success: false,
                message: "Student ID is invalid",
                resToArduino: "Student ID is invalid",
                resCode: 404
            })
            return
        }

        const busManifestFindStudent = await busManifest.findOne({ busCode, studentList: findStudent.student_id })
        if (!busManifestFindStudent) {
            res.status(400).json({
                success: false,
                message: "Student is not on the Bus Manifest",
                resToArduino: "Student is not on  the Bus Manifest",
                resCode: 400
            })
            return
        }


        let attendance = await BusAttendance.findOne({
            busCode: busManifestFindStudent.busCode,
            date: currentDate
        });

        let isCheckIn = false

        if (!attendance) {
            // If no attendance record exists for the bus today, create a new one
            attendance = new BusAttendance({
                busCode: busManifestFindStudent.busCode,
                date: currentDate,
                students: [{ studentId, time_In: new Date(), time_Out: null }],
            });
            isCheckIn = true
        } else {

            // Check if the student is already in the record
            const studentIndex = attendance.students.findIndex(
                (s) => s.studentId === studentId
            );

            console.log("studentIndex:", studentIndex)
            if (studentIndex === -1) {
                // If student has no record, create a new check-in
                attendance.students.push({ studentId, time_In: new Date(), time_Out: null });
                isCheckIn = true
                console.log("first scan", isCheckIn = true)
            } else {
                // If student is already checked in but has no time_Out, update it
                if (!attendance.students[studentIndex].time_Out) {
                    attendance.students[studentIndex].time_Out = new Date();
                    isCheckIn = false
                    console.log("second scan", isCheckIn = false)
                } else {
                    return res.json({
                        success: false,
                        message: "Student is Already Checked Out",
                        resToArduino: "Student is Already Checked Out",
                        resCode: 400
                    });
                }
            }


        }

        const name = findStudent.firstname + " " + findStudent.lastname
        const datee = new Date().toLocaleString("en-US", { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
        const message = `Hi Ma'am/Sir, This is to inform you that ${name} has ${isCheckIn ? 'got on' : 'got off'}  the bus on ${datee}`

        smsApi(findStudent.guardian_mobile_number, message)
        await attendance.save();
        res.json({
            success: true,
            message: "Attendance recorded",
            resToArduino: "Attendance Recorded",
            resCode: 200
        });

    } catch (error) {
        console.log(error)
    }
}



// const sendSMS = async (body) => {
//     try {
//         const message = await client.messages
//             .create({
//                 body: body,
//                 from: '+12694426956',
//                 to: '+639624513047'
//             })

//         console.log(message.sid)
//     } catch (error) {
//         console.log(error)
//     }
// }



module.exports = { attendance }