import React, { useState } from 'react'
import {Link} from 'react-router-dom'

export default function SignupForm () {
    const [usernameText, setUsernameText] = useState('')
    const [passwordText, setPasswordText] = useState('')

    function handleUsernameChange(event) {
        setUsernameText(event.target.value)
    }

    function handlePasswordChange(event) {
        setPasswordText(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameText, password: passwordText })  
        }
        fetch('/sign-up', options) 
    }

    //send up the token on login
    //make a login form that will return a json webtoken with the user id
    //then authenticate the users

    return (
        <div>
            <h1>Sign in here!</h1>
            <form onSubmit= {handleSubmit}>
                {/* Username  */}
                <label>
                    Username:
                    <input type="text" 
                    value={usernameText} 
                    onChange={handleUsernameChange} />
                </label>

                {/* Password */}
                <label>
                    Password:
                    <input type="text" 
                    value={passwordText}
                    onChange={handlePasswordChange} />
                </label>

                {/* Button  */}
                <button type="submit">Submit</button>
            </form>
            <div>
                Already have an account? Login <Link to="/login">here</Link>
            </div>
        </div>
    )
}