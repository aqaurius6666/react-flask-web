import { useState, useContext } from "react"
import { Redirect } from "react-router-dom"
import { api_login } from "../API/action"
import App from "../App"
import history from "../history"
import userContext from "./userContext"

export const Login = (props) => {
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username: </label>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username}></input>
            </div>
            <div>
                <label>Password: </label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            </div>
            <div><button>Log in</button></div>
        </form>
    )
}