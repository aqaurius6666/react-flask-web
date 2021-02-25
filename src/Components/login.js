import { useState, useContext } from "react"
import {Link} from "react-router-dom"
import { api_login } from "../API/action"
import history from "../history"
<<<<<<< HEAD
import userContext from "./userContext"
=======
import accountContext from "./accountContext"

>>>>>>> b66be09429680e42eac9097e9c989f07dc1298ec

export const Login = () => {
    const {setAccount} = useContext(accountContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
        api_login(username, password, (msg, account) => {
            console.log(msg)
            setAccount(account)
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