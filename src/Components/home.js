import { useContext} from "react"
import userContext from "./userContext"

export const Home = (props) => {
    const {user} = useContext(userContext)
    if (user) {
        return (
            <>
            <div>Welcome, {user.username}!</div>
            </>
        )
    } else {
        return (
            <div>You are not log in!</div>
        )
    }
}

