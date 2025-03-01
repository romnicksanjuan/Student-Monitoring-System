const Student = require('../model/student-model.js')
const say = require("say")
const fs = require("fs")

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

        const firstInitial = firstname.charAt(0)
        console.log(greet, lastname, firstInitial)

        const filepath = "tts.wav";

        say.export(greet + lastname + firstInitial, "Microsoft Zira Desktop", 1.0, filepath, (err) => {
            if (err) return console.error(err);
            console.log("Audio saved!");
        });


        const audioBuffer = fs.readFileSync(filepath)

        console.log(audioBuffer)
        const newStudent = new Student({
            student_id, email, firstname, lastname, gender, date_of_birth, age,
            address, guardian_name, guardian_mobile_number, guardian_relationship,
            guardian_lastname, tts: {
                data: audioBuffer,
                contentType: "audio/wav"
            }

        })
        const save = await newStudent.save()

        fs.unlinkSync(filepath)
        res.status(200).json({ message: "Student Registered Successfull", save })
    } catch (error) {
        console.log(error)
    }
}

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

module.exports = { registerStudent, updateStudent, getStudentList, getStudentById, deleteStudent, studentCount }