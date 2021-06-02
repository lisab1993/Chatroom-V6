const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
// Morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process.
//npm install morgan --save
// const AuthController = require('./controllers/auth')
const UserController = require('./controllers/users.js')
const MessageController = require('./controllers/messages')
const SocketController = require('./controllers/socket-events')

const app = express()

// establishes the static file location
app.use(express.static('static'))
// knows to use json or somethin
app.use(express.json())
//makes express look cool 
app.use(morgan('dev'))

// app.use('/', AuthController)
app.use('/', MessageController)
app.use('/', UserController)

const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', SocketController(io))

// connect to mongoose 
const connectDatabase = async (databaseName = 'chatroomv6', hostname = 'localhost') => {
  const database = await mongoose.connect(
    `mongodb://${hostname}/${databaseName}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  )
  // console.log(`Database connected at mongodb://${hostname}/${databaseName}...`)

  return database
}

const startServer = port => {
  http.listen(port, async () => {
    await connectDatabase()
    console.log(`Server listening on port ${port}...`)
  })
}

startServer(8000)



