const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, ref: "Student" },
    time_In: { type: Date, default: Date.now, required: true },
    time_Out: { type: Date, default: null },
});

const busAttendanceSchema = new mongoose.Schema({
    busCode: { type: String, required: true },
    date: { type: Date, required: true, index: true }, // Indexing improves search speed
    students: [studentSchema], // Embedding the student schema
    isCheckIn: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("BusAttendance", busAttendanceSchema);
