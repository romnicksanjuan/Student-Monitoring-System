const mongoose = require("mongoose")

const manifestSchema = new mongoose.Schema({
    busCode: { type: Number, required: true },
    busPlateNumber: { type: String, required: true },
    busCapacity: { type: Number, required: true },
    busDriverName: { type: String, required: true },
    email: { type: String, required: true },
    studentList: [{ type: String, ref: "Student" }],
}, { timestamps: true })

module.exports = mongoose.model("bus-manifest", manifestSchema)