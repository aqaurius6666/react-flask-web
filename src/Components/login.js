import React, { useState } from "react"
import {Link} from "react-router-dom"
import { authenticationService } from "../API/service"
import history from "../history"
import NavBar from "./nav-bar";
import {loadingContext} from "./loadingContext";

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        authenticationService.login(username, password).then(
            history.push('/')
        )
    }
    return (
        <div className="login-container">
            <NavBar />
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <input type="text" placeholder="Username"
                               onChange={(e) => setUsername(e.target.value)} value={username} />
                        <input type="password" placeholder="Password"
                               onChange={(e) => setPassword(e.target.value)} value={password} />
                        <button type="submit" value="Login" className="btn btn-dark btn-lg">login</button>
                        <p className="message">Not registered? <Link to="/register">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
            <div className="login-padding">

            </div>
        </div>
    )
}