const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    student_id: { type: String },
    email: { type: String },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    gender: { type: String },
    date_of_birth: { type: Date, required: true },
    age: { type: Number },
    address: { type: String, required: true },
    guardian_name: { type: String, required: true },
    guardian_mobile_number: { type: Number, required: true },
    guardian_relationship: { type: String, required: true },
    guardian_lastname: { type: String, required: true }
},{ timestamps: true })

module.exports = mongoose.model('Student', studentSchema)