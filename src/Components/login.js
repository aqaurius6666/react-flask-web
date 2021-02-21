import { useState, useContext } from "react"
import { api_login } from "../API/action"
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
        <div>
            <br /> <br />
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input type="text" onChange={(e) =>
                        setUsername(e.target.value)} value={username} />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" onChange={(e) =>
                        setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" value="Login" className="btn btn-dark btn-lg">Log in</button>
            </form>
        </div>
    )
}