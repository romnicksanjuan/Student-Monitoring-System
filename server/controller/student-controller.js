const Student = require('../model/student-model.js')
// const say = require("say")
const fs = require("fs")
const googleTTS = require('google-tts-api');
const axios = require("axios");
// const path = require('path');

const registerStudent = async (req, res) => {
    const { student_id,
        firstname,
        lastname,
        date_of_birth,
        gender,
        age,
        strand,
        address,
        email,
        guardian_name,
        guardian_mobile_number,
        guardian_relationship,
        guardian_lastname } = req.body

    // const formData = req.body

    // console.log("form data:", formData.email)
    try {


        const birth_date = new Date(date_of_birth).toLocaleString("en-US", { timeZone: 'Asia/Manila', year: "numeric", day: 'numeric', month: 'long' })
        // console.log(birth_date)
        const greet = "Hello, Welcome,";
        const bye = "Thank You, Good Bye"
        const firstInitial = firstname.charAt(0)

        const ttsUrl_in = googleTTS.getAudioUrl(greet + lastname + firstInitial, { lang: "en", slow: false });
        const ttsUrl_out = googleTTS.getAudioUrl(bye + lastname + firstInitial, { lang: "en", slow: false })

        const filename_time_in = "time-in-audio.mp3"
        const filename_time_out = "time-out-audio.mp3"

        const time_in = await downloadMP3(ttsUrl_in, filename_time_in)
        const time_out = await downloadMP3(ttsUrl_out, filename_time_out)

        if (!time_in) {
            return
        }

        if (!time_out) {
            return
        }

        const time_in_buffer = fs.readFileSync(filename_time_in)
        const time_out_buffer = fs.readFileSync(filename_time_out)
        // console.log(time_in_buffer)

        const newStudent = new Student({
            student_id, email, firstname, lastname, gender, date_of_birth: birth_date, age, strand,
            address, guardian_name, guardian_mobile_number, guardian_relationship,
            guardian_lastname,
            tts: {
                data: time_in_buffer,
                contentType: "audio/mp3"
            },
            tts_out: {
                data: time_out_buffer,
                contentType: "audio/mp3"
            }

        })
        await newStudent.save()
        fs.unlinkSync(filename_time_in)
        fs.unlinkSync(filename_time_out)
        res.status(200).json({ message: "Student Registered Successfull" })
    } catch (error) {
        console.log(error)
    }
}

// update student
const updateStudent = async (req, res) => {
    const { id } = req.params
    const { student_id, email, firstname, lastname, gender, date_of_birth, age,strand, address, guardian_name, guardian_mobile_number, guardian_relationship, guardian_lastname } = req.body
    // console.log("numberrrrr", strand)

    try {
        await Student.findByIdAndUpdate({ _id: id },
            {
                student_id,
                email,
                firstname,
                lastname,
                gender,
                date_of_birth,
                age,
                strand,
                address,
                guardian_name,
                guardian_mobile_number,
                guardian_relationship,
                guardian_lastname
            }, { new: true })

        res.status(200).json({ success: true, message: "Student Updated Successfully" })
    } catch (error) {
        console.log(error)
    }
}

// get student list
const getStudentList = async (req, res) => {
    try {
        const getAllStudent = await Student.find({}).lean()

        if (!getAllStudent) {
            res.json("No Student Created Yet")
            return
        }

        const stud = getAllStudent.map((s) => {
            const date = new Date(s.date_of_birth).toLocaleString("en-US", { timeZone: "Asia/Manila", year: "numeric", month: 'long', day: "2-digit" })
            return {
                ...s,
                date_of_birth: date
            }
        })
        // console.log("count:", stud)
        res.status(200).json(stud)
    } catch (error) {
        console.log(error)
    }
}


const studentCount = async (req, res) => {
    try {
        const getAllStudent = await Student.find({}).countDocuments()

        if (!getAllStudent) {
            res.json("No Student Created Yet")
            return
        }
        // console.log("count:", getAllStudent)
        res.status(200).json(getAllStudent)
    } catch (error) {
        console.log(error)
    }
}

// get student by student id
const getStudentById = async (req, res) => {
    const { studentId } = req.params
    try {
        const getStudent = await Student.findOne({ student_id: studentId })

        if (!getStudent) {
            res.status(404).json({ message: "Student not found" })
            return
        }
        res.status(200).json(getStudent)
    } catch (error) {
        console.log(error)
    }
}

// delete student
const deleteStudent = async (req, res) => {
    const { id } = req.params
    // console.log(id)
    try {
        const delStudent = await Student.findOneAndDelete({ _id: id })

        if (!delStudent) {
            return res.json("Student not found")
        }
        res.json("Student Deleted Successful")

    } catch (error) {
        console.log(error)
    }
}


// Download MP3 file
async function downloadMP3(url, filename) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(filename));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => resolve(filename));
        response.data.on('error', reject);
    });
}

// search student
const searchStudent = async (req, res) => {
    const { firstname } = req.query

    try {
        const search = await Student.find({ firstname: new RegExp(firstname, "i") }).lean()

        const s = search.map((s) => ({
            ...s,
            date_of_birth: new Date(s.date_of_birth).toLocaleString("en-US", { timeZone: "Asia/Manila", year: "numeric", day: "numeric", month: "long" })
        }))

        res.status(200).json(s)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    registerStudent, updateStudent, getStudentList, getStudentById, deleteStudent, studentCount,
    searchStudent
}