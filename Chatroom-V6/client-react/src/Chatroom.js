import React from 'react'
import {
  useParams,
  Link
} from 'react-router-dom'
import MessageForm from './MessageForm'

export default function Chatbox (props) {
  const { roomname } = useParams()
  // console.log(props, 'props from chiz-at-room yo')


  return (
    <div style={{backgroundColor: 'steelblue'}}>
      <Link to='/'>Main Lobby</Link>
      <h1>{roomname}</h1>

      <MessageForm onSubmit={props.onSubmitMessage} room={roomname} />
      {props.messages
      .filter(msg => msg.room == roomname)
      .map((msg, index) => <li key={index}>{msg.text}</li>)}
        
    </div>
  )
}
