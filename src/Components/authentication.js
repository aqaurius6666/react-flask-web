import { useContext } from "react"
import { Redirect } from "react-router-dom"
import userContext from "./userContext"

export const AuthenticationApp = (props) => {
    const {user} = useContext(userContext)
    if (user) {
        return <div>Hello {user.sid}</div>
    } else {
        return <Redirect to="/login"/>
        
    }

}
