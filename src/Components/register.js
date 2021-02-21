import React, { useState } from 'react'
import { api_register, logout } from '../API/action'
import history from '../history'



export const Register = () => {
    return (
        <>
        <RegisterForm/>
        </>
    )
}
export const RegisterForm = () => {
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
        return pass === pass2
    }
    return (
        <div>
            <br /> <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <div className="form-group">
                    <label>Conf. Password: </label>
                    <input type="password" onChange={(e) => setPassword2(e.target.value)} value={password2} />
                </div>
                <div><button className="btn btn-dark btn-lg">Register</button></div>
            </form>
        </div>

    )
}