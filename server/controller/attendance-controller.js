const BusAttendance = require("../model/attendance.js")
const busManifest = require("../model/bus-manifest.js")
const studentModel = require("../model/student-model.js")
const { checkout } = require("../routes/route.js")
const { smsApi } = require("./smsController.js")
const { sendAudio } = require("./web-socket.js")


const attendance = async (req, res) => {
    const { studentId, busCode } = req.body

    console.log(studentId, busCode)
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0);

    // console.log("currentDate:", currentDate)
    try {
        const findStudent = await studentModel.findOne({ student_id: studentId })
        if (!findStudent) {
            res.status(404).json({
                success: false,
                message: "Student Not Found",
                resToArduino: "Student Not Found",
                resCode: 404
            })
            return
        }

        const busManifestFindStudent = await busManifest.findOne({
            busCode, studentList: findStudent.student_id,
            // createdAt: { $gte: currentDate, $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) }
        })

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
            busCode: busCode,
            date: { $gte: currentDate, $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) }
        });

        let isCheckIn = false

        if (!attendance) {
            // If no attendance record exists for the bus today, create a new one

            isCheckIn = true
            attendance = new BusAttendance({
                busCode: busCode,
                date: new Date(currentDate),
                students: [{ studentId, time_In: new Date(), time_Out: null }],
            });



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
        if (!isCheckIn) {
            const time_Out_Audio = findStudent.tts_out.data.toString("base64")
            sendAudio(time_Out_Audio)
        } else {
            const audio = findStudent.tts.data.toString("base64")
            // console.log("audio:::",audio)
            sendAudio(audio)
        }

        const name = findStudent.firstname + " " + findStudent.lastname
        console.log("full name:", name)
        const datee = new Date().toLocaleString("en-US", { timeZone: 'Asia/Manila', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
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

// todays attenddance count
const todaySAttendance = async (req, res) => {
    let today = new Date();
    today.setHours(0, 0, 0, 0)

    try {
        const getAttendance = await BusAttendance.find({ createdAt: { $gte: today } }).select("students")

        const total = getAttendance.reduce((total, manifest) => total + manifest.students.length, 0)

        if (!getAttendance) {
            res.status(400).json({ success: false, getAttendance })
            return;
        }
        res.status(200).json({ success: true, total })
    } catch (error) {
        console.log(error.message)
    }
}

// attendance for today
const getAttendance = async (req, res) => {
    const { date } = req.params

    console.log("date:", date)
    const startDate = new Date(date)
    startDate.setHours(0, 0, 0, 0)

    const endDate = new Date(startDate);
    endDate.setHours(23, 59, 59, 999);
    try {
        const get_attendance = await BusAttendance.findOne({ createdAt: { $gte: startDate, $lt: endDate } })
        console.log("tessssssssst:", get_attendance)

        if (!get_attendance) {
            return res.status(404).json("No Record")
        }

        const StudentID = get_attendance.students.map((studID) => ({
            studentId: studID.studentId,
            time_In: studID.time_In,
            time_Out: studID.time_Out
        }))

        const Students = await studentModel.find({ student_id: StudentID.map(s => s.studentId) })

        // console.log(Students)

        const data = Students.map((s) => {

            const findStudID = StudentID.find(a => a.studentId.toString() === s.student_id.toString())
            return {
                student_id: s.student_id,
                first_name: s.firstname,
                last_name: s.lastname,
                time_In: new Date(findStudID.time_In).toLocaleString("en-US", { timeZone: "Asia/Manila", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }),
                time_Out: new Date(findStudID.time_Out).toLocaleString("en-US", { timeZone: "Asia/Manila", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" }),
            }
        })
        // console.log(data)
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }
}



module.exports = { attendance, todaySAttendance, getAttendance }