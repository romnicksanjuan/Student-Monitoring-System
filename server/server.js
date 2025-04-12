const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes/route.js')
const app = express()
const http = require("http")
const { initializeWebSocket } = require("./controller/web-socket.js")

const server = http.createServer(app)

const MONGO_URI = "mongodb+srv://romnick:1234@romnickdb.e14diyv.mongodb.net/student-monitoring-system"

mongoose.connect(MONGO_URI)
    .then(() => console.log("connected to database"))
    .catch((err) => console.log(err))


initializeWebSocket(server)

const Domain = "https://student-monitoring-system.vercel.app"
const LocalDomain = "http://localhost:5173"

app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(cors({
    origin: Domain,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}))
app.use(bodyParser.json())
app.use('/', router)

server.listen(3001,'0.0.0.0', () => {
    console.log('server is running')
})