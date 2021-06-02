import React, { useState } from 'react'
import {useParams} from 'react-router-dom'

export default function MessageForm (props) {
  const [inputValue, setInputValue] = useState('')
  // console.log(props)
  function handleChange (event) {
    setInputValue(event.target.value)
  }
  const { roomname } = useParams()
  function handleSubmit (event) {
    event.preventDefault()
    const thisRoom = roomname
    // console.log(props)
    props.onSubmit(inputValue, thisRoom)
  }
  

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={inputValue} onChange={handleChange} />
      <button type='submit'>Send</button>
    </form>
  )
}
