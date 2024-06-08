const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require("cors")
const session = require('express-session')
const path = require("path") 

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler')
const teacherRoute = require('./routes/teacherRoute')
const courseRoute = require('./routes/courseRoute')

const app = express()
app.use(cors())
app.use(express.static(__dirname))
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))

app.use('/api/teacher', teacherRoute)
app.use('/api/course', courseRoute)

app.use(notFoundHandler)
app.use(errorHandler)

module.exports = app



