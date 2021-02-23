import React, { useState } from 'react'
import { api_register, logout } from '../API/action'
import history from '../history'
import {Link} from "react-router-dom";



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
        <div className="login-container">
            <div className="login-page">
                <div className="form">
                    <form className="register-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)} value={username} />
                        <input type="password" placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)} value={password} />
                        <input type="password" placeholder="Conf. Password"
                               onChange={(e) => setPassword2(e.target.value)} value={password2} />
                        <button>create</button>
                        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                    </form>
                </div>
                <div className="login-padding">

                </div>
            </div>
        </div>
    )
}