import React, { useState } from 'react'

import { useHistory, Link } from 'react-router-dom'

export default function Login(props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //useHistory keeps track of browser manipulations
  //you can go back to the previous page, as an example
  //this allows us to visit other pages without refreshing and losing state
  //it kinda runs parallel to your browser history
  const history = useHistory()

  function handleChangeUsername(event) {
    setUsername(event.target.value)
  }

  function handleChangePassword(event) {
    setPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault()
    // console.log(`username: ${username}, password: ${password}`)
    const options = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       },
      body: JSON.stringify({ username: username, password: password })
    }
    fetch('/login', options)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        props.getToken(data)
        data.token 
        ? history.push('/')
        : alert('Oops, something went wrong :/')
      })
    // props.onLogin(username)
    // redirects back to home after successful login
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='username...' value={username} onChange={handleChangeUsername} />
        <input type='password' placeholder='password...' value={password} onChange={handleChangePassword} />
        <button type='submit'>Login</button>
      </form>

      <div>
        Don't have an account yet? Sign up <Link to="/signup">here</Link>
      </div>
    </>
  )
}
