const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, default: null },
    date_of_birth: { type: Date },
    profile: {
        data: { type: Buffer },
        contentType: { type: String },
        // default: null
    },
    address: { type: String, default: null },
    password: { type: String, required: true },
    role: { type: String, required: true }
}, { timestamps: true })
module.exports = mongoose.model("user", userSchema)