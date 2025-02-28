const crypto = require("crypto")
const BusManifest = require("../model/bus-manifest.js")
const studentModel = require("../model/student-model.js")
const { response } = require("express")

// create bus manifest
const createManifest = async (req, res) => {
    const { busPlateNumber, busCapacity, busDriverName, email, } = req.body
    const generate = crypto.randomInt(100000, 999999)

    try {
        if (!busPlateNumber || !busCapacity || !busDriverName || !email) {
            res.json("All fields are required!")
        }

        const newManifest = new BusManifest({ busCode: generate, busCapacity, busDriverName, email, busPlateNumber })
        await newManifest.save()
        res.status(200).json("Manifest Created Successfull")
    } catch (error) {
        console.log(error)
    }
}

// get bus manifest list
const getManifestList = async (req, res) => {
    try {
        const getList = await BusManifest.find({})

        console.log(getList)
        res.json(getList)

    } catch (error) {
        console.log(error)
    }
}

// get manifest by bus code
const getMnifest = async (req, res) => {
    const { busCode } = req.params
    try {
        const getManifestByBusCode = await BusManifest.findOne({ busCode })
        if (!getManifestByBusCode) {
            res.json("Manifest Not Fpund")
            return
        }
        res.json(getManifestByBusCode)
    } catch (error) {
        console.log(error)
    }
}
// update manifest
const updateManifest = async (req, res) => {
    const { id } = req.params
    const { busCode, busPlateNumber, busCapacity, busDriverName, email } = req.body
    try {
        const update = await BusManifest.findByIdAndUpdate(id, { busCode, busPlateNumber, busCapacity, busDriverName, email }, { new: true })
        if (!update) {
            // console.log("Manifest not found or invalid ID")
            res.status(404).json("Manifest not found or invalid ID")
            return
        }
        res.json({ message: "Minfest Updated Successfull", update })
    } catch (error) {
        console.log(error)
    }
}

// student manifest add
const manifestAddStudent = async (req, res) => {
    const { manifestId } = req.params;
    const { studentId } = req.body;
    console.log(studentId)
    try {

        const findStudent = await studentModel.findOne({ student_id: studentId })

        if (!findStudent) {
            console.log("student not found")
            res.status(404).json("Student not found")
            return
        }

        const findStudentInManifest = await BusManifest.findOne({ _id: manifestId, studentList: studentId })

        if (findStudentInManifest) {
            console.log("student already added")
            res.status(500).json("Student already added to manifest")
            return
        }

        const update = await BusManifest.findByIdAndUpdate(
            manifestId,
            { $push: { studentList: studentId } },
            { new: true }
        );

        console.log(update)
        res.status(200).json("Student Added Successfull!")
    } catch (error) {
        console.log(error)
    }
}
// student manifest remove
const removeStudentFromManifest = async (req, res) => {
    const { manifestId } = req.params
    const { studentId } = req.body
    console.log(manifestId, studentId)
    try {
        const findStudent = await studentModel.findOne({ student_id: studentId })
        if (!findStudent) {
            console.log("Student not found")
            res.status(404).json("Student not found")
            return
        }

        const findStudentInManifest = await BusManifest.findOne({ _id: manifestId, studentList: studentId })

        if (!findStudentInManifest) {
            console.log("Student not in manifest")
            res.status(400).json("Student not in manifest")
            return
        }
        const remove = await BusManifest.findByIdAndUpdate(manifestId, { $pull: { studentList: studentId } })
        res.status(200).json({ message: "Student Removed from Manifest Successfull", remove })

    } catch (error) {
        console.log(error)
    }
}
// bus manifest count
const busManifestCount = async (req, res) => {
    try {
        const getBusManifestCount = await BusManifest.countDocuments()
        if (!getBusManifestCount) {
            console.log("No Bus Manifest Found")
            return
        }
        res.status(200).json({ success: true, getBusManifestCount })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createManifest, getManifestList, getMnifest,
    updateManifest, manifestAddStudent, removeStudentFromManifest,
    busManifestCount
}