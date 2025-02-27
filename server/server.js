const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/route.js')
const app = express()

const MONGO_URI = "mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/student-monitoring-system"

mongoose.connect(MONGO_URI)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}))
app.use(bodyParser.json())
app.use('/', router)

app.listen(3001, () => {
    console.log('server is running')
})