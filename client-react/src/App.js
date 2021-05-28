import './App.css'
import React from 'react'

import Rooms from './Rooms'
import SignupForm from './SignupForm'
import Login from './Login'
import Chatroom from './Chatroom'

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
      messages: [],
      nick: '',
      token: ''
    }
    this.getToken = this.getToken.bind(this)
  }

  componentDidMount() {
    socket.on('chat message', msg => {
      console.log(this.state.messages)
      this.setState({ messages: this.state.messages.concat(msg) })
      console.log('got a message')
      console.log(msg)
    })

    // fetch('/messages')
    //   .then(res => res.json())
    //   .then(newMessages => {
    //     this.setState({ messages: newMessages })
    //   })
  }

  handleSubmitMessage(text, room) {
    const message = { nick: this.state.nick, room, text }
    console.log(message)
    socket.emit('chat message', message)
  }

  getToken(data) {
    this.setState({ token: data.token })
    console.log('this is our token' + this.state.token)
  }

  handleLogin(username) {
    this.setState({ nick: username })
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          {/* <Route exact path="/login" >
            {this.state.token ? <Redirect to="/" />
              : <Login 
              getToken={this.getToken} 
              />
            }
          </Route > */}

          <Route path='/signup'>
            <SignupForm />
          </Route>


          {/* <Route path='/rooms/:roomname'>
            <Chatroom onSubmitMessage={this.handleSubmitMessage.bind(this)} messages={this.state.messages} />
          </Route>

          <Route exact path='/'>
            <h1>Chatroom phase 5</h1>
            <Rooms messages={this.state.messages} />
          </Route> */}
        </Switch>
      </div>
    )
  }
}

export default App
