import React, { useState } from "react"
import { Link } from "react-router-dom"
import { authenticationService } from "../API/service"
import history from "../history"
import Loading from "./loading"

export const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        authenticationService.login(username, password).then(() => {
            setLoading(false)
            history.push('/')
        })
    }
    if (loading) return <Loading/>
    return (
        <div className="login-container">
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