const express = require('express')
const mongoose = require('mongoose')
// Morgan is a Node. js and Express middleware to log HTTP requests and errors, and simplifies the process.
//npm install morgan --save
const morgan = require('morgan')
const { Server } = require('socket.io')

const app = express()
const port = 8000

//“dev”: A color-coded (by request status) log format.
app.use(morgan('dev'))
app.use(express.json())

//connects to the routes created under the "routes" directory
const userRoutes = require('./routes/signuplogin.js')
app.use('/', userRoutes)

// const protectedRoutes = require('./routes/loggedin.js')
// app.use('/', protectedRoutes)

//creates an async function that will be used to connect to "localhost", and the name of our database.
const connectDatabase = async (hostname, databaseName) => {
    const database = await mongoose.connect(
      `mongodb://${hostname}/${databaseName}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )
  
    console.log(`database connected at mongodb://${hostname}/${databaseName}`)
  
    return database
  }

  const server = require('http').createServer(app)
  const io = new Server(server)
  


  //the express app listens on port 8000, and asynchronously runs the connectDatabase function crreated above.
  const startServer = port => {
  app.listen(port, async () => {
    await connectDatabase('localhost', 'chatroomv6')
    io.on('connection', (socket) => {
        console.log('a user connected')
    
        socket.on('chat message', (msg) => {
          console.log('message: ' + msg)
          const data = JSON.stringify(msg)
    
          io.emit('chat message', msg)
    
          fs.appendFile(deps.messagesPath, '\n' + data, err => {
            if (err) {
              console.log('failed to write to file')
            }
          })
        })
      })

    console.log(`server is listening on port ${port}`)
  })}

  startServer(8000)