import { useState, useContext } from "react"
import {Link, Redirect} from "react-router-dom"
import { api_login } from "../API/action"
import App from "../App"
import history from "../history"
import userContext from "./userContext"
import NavBar from "./nav-bar";


export const Login = () => {
    const {setUser} = useContext(userContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        api_login(username, password, (msg, user) => {
            console.log(msg)
            setUser(user)
            history.push("/")
        })
    }
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
                        <p className="message">Not registered? <Link exact to="/register">Create an account</Link>
                        </p>
                    </form>
                </div>
            </div>
            <div className="login-padding">

            </div>
        </div>
    )
}