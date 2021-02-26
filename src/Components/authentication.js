import { useContext } from "react"
import { Redirect } from "react-router-dom"
import accountContext from "./accountContext"

export const AuthenticationApp = (props) => {
    const {account} = useContext(accountContext)
    if (account) {
        return <div>Hello {user.sid}</div>
    } else {
        return <Redirect to="/login"/>
    }

}
