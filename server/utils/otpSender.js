const nodemailer = require("nodemailer");
const crypto = require('crypto')
const Otp = require('../model/otp.js')

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    tls: {
        rejectUnauthorized: false  // Ignore certificate validation
    },
    service: 'gmail',
    auth: {
        user: 'romnicksanjuan22@gmail.com',
        pass: 'miho qtfh mijo xlts'
    }
});

const generateOtp = () => {
    const otp = crypto.randomInt(100000, 999999).toString()
    return otp
}

const sendOtp = async (email) => {
    // send mail with defined transport object
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    const optionMail = {
        from: 'romnicksanjuan22@gmail.com',
        to: email, // list of receivers
        subject: 'Password Reset OTP', // Subject line
        text: `Hello, We received a request to reset your password. Please use the One-Time Password (OTP) below to proceed with your password change:
        OTP: ${generateOtp()}
        
        This OTP is valid for 5 minutes. If you did not request this change, please ignore this email or contact support immediately.`,
    }

    transporter.sendMail(optionMail, (err, info) => {
        if (err) {
            console.log(err.message)
            return
        }
    });
    const neweOTP = new Otp({ email: email, otp: generateOtp(), expiresAt: expiresAt })
    await neweOTP.save()


}


module.exports = { sendOtp }
