import './App.css'
import React from 'react'

import Selectrooms from './Rooms'
import SignupForm from './SignupForm'
import Login from './Login'
import Chatbox from './Chatroom'

import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'

import io from '../../node_modules/socket.io/client-dist/socket.io.js'


const socket = io('http://localhost:3000')

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [{
        room: 'butts',
        text: 'hi'
      }],
      nick: '',
      token: ''
    }
    this.getToken = this.getToken.bind(this)
    this.handleGetMessages = this.handleGetMessages.bind(this)
  }

  componentDidMount() {
    // console.log(this.state, "this is state from App")
    socket.on('chat message', msg => {
      // console.log(this.state.messages)
      this.setState({ messages: this.state.messages.concat(msg) })
      // console.log('got a message')
      // console.log(msg)
    })
  }

  handleGetMessages(token) {
    fetch('/messages', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(newMessages => {
        this.setState({ messages: newMessages })
        // console.log(newMessages)
      })
  }



  handleSubmitMessage(text, room) {
    const message = { nick: this.state.nick, room, text, token: this.state.token }
    // console.log(message)
    socket.emit('chat message', message)
  }

  getToken(data) {
    this.setState({ token: data.token, nick: data.username })
    this.handleGetMessages(data.token)
    // console.log('this is our token' + this.state.token)
  }


  render() {
    return (
      <div className='App'>
        <Switch>
          {/* Login Route  */}
          <Route exact path="/login" >
            {this.state.token ? <Redirect to="/" />
              : <Login
                getToken={this.getToken}
                handleGetMessages={this.handleGetMessages}
              />
            }
          </Route >

          {/* Signup Route  */}
          <Route path='/signup'>
            <SignupForm />
          </Route>

          {/* Room Selection Route  */}
          {/* :roomname is a parameter  */}
          <Route path='/rooms/:roomname'>
            {this.state.token
              ? <Chatbox onSubmitMessage={this.handleSubmitMessage.bind(this)} messages={this.state.messages} />
              : <Login 
              getToken={this.getToken}
              handleGetMessages={this.handleGetMessages} 
              />
            }
          </Route>

          {/* Home  */}
          <Route exact path='/'>
            {this.state.token
              ?
              <>
                <h1>Chatroom phase 6</h1>
                <Selectrooms onSubmitMessage={this.handleSubmitMessage.bind(this)} messages={this.state.messages} />
                <Chatbox onSubmitMessage={this.handleSubmitMessage.bind(this)} messages={this.state.messages} />
              </>
              : <Login
                getToken={this.getToken}
                handleGetMessages={this.handleGetMessages}
              />
            }
          </Route>
        </Switch>

      </div>
    )
  }
}

export default App
