import React, { useState } from 'react'
import { api_register, logout } from '../API/action'
import history from '../history'



export const Register = (props) => {

    return (
        <>
        <RegisterForm/>
        </>
    )
}
export const RegisterForm = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (checkPassword(password, password2)) {
            api_register(username, password, (msg) => {
                console.log(msg)
                history.push('/login')}
                )
        } else {
            console.log("password not match")
        }
        
    }
    const checkPassword = (pass, pass2) => {
        return pass == pass2
    }
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username: </label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}></input>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            </div>
            <div>
                <label>Conf. Password: </label>
                <input type="password" onChange={(e) => setPassword2(e.target.value)} value={password2}></input>
            </div>
            <div><button>Register</button></div>
        </form>
    )
}