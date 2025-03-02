const Student = require('../model/student-model.js')
// const say = require("say")
const fs = require("fs")
const googleTTS = require('google-tts-api');
const axios = require("axios");
const path = require('path');

const registerStudent = async (req, res) => {
    const { student_id,
        firstname,
        lastname,
        date_of_birth,
        gender,
        age,
        address,
        email,
        guardian_name,
        guardian_mobile_number,
        guardian_relationship,
        guardian_lastname } = req.body
    try {
        const greet = "Hello, Welcome,";
        const bye = "Thank You, Good Bye"
        const lang = "en"; // Change to any supported language, e.g., "fil" for Filipino
        const slow = false;
        const firstInitial = firstname.charAt(0)

        const ttsUrl = googleTTS.getAudioUrl(greet + lastname + firstInitial, { lang: "en", slow: false });
        const base64 = await googleTTS.getAudioBase64(bye + lastname + firstInitial, { lang: "en", slow: false })

        const buffer = Buffer.from(base64, "base64")

        const time_Out_Filepath = "time-out-audio.mp3"
        fs.writeFileSync(time_Out_Filepath, buffer)
        console.log("Generated TTS URL:", ttsUrl);
        // console.log(greet, lastname, firstInitial)

        const filepath = "output.mp3";
        const tts = await downloadMP3(ttsUrl, filepath)
        // const tts = await generateTTS(greet, lastname, firstInitial, filepath)

        if (!tts) {
            console.log(tts)
            return
        }
        const audioBuffer = fs.readFileSync(filepath)

        console.log(audioBuffer)
        const newStudent = new Student({
            student_id, email, firstname, lastname, gender, date_of_birth, age,
            address, guardian_name, guardian_mobile_number, guardian_relationship,
            guardian_lastname,
            tts: {
                data: audioBuffer,
                contentType: "audio/mp3"
            },
            tts_out: {
                data: buffer,
                contentType: "audio/mp3"
            }

        })
        await newStudent.save()
        // const filepath = "tts.wav";
        fs.unlinkSync(filepath)
        res.status(200).json({ message: "Student Registered Successfull" })
    } catch (error) {
        console.log(error)
    }
}

// update student
const updateStudent = async (req, res) => {
    const { id } = req.params
    const { student_id, email, firstname, lastname, gender, date_of_birth, age, address, guardian_name, guadian_mobile_number, guardian_relationship, guardian_lastname } = req.body
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
                address,
                guardian_name,
                guadian_mobile_number,
                guardian_relationship,
                guardian_lastname
            }, { new: true })

        res.status(201).json("Student Updated Successfully")
    } catch (error) {
        console.log(error)
    }
}

// get student list
const getStudentList = async (req, res) => {
    try {
        const getAllStudent = await Student.find({})

        if (!getAllStudent) {
            res.json("No Student Created Yet")
            return
        }
        console.log("count:", getAllStudent)
        res.status(200).json(getAllStudent)
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
        console.log("count:", getAllStudent)
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
    const { studentId } = req.params
    try {
        const delStudent = await Student.findOneAndDelete({ student_id: studentId })

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
        const search = await Student.find({ firstname: new RegExp(firstname, "i") })

        res.status(200).json(search)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    registerStudent, updateStudent, getStudentList, getStudentById, deleteStudent, studentCount,
    searchStudent
}