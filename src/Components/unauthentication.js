import { useContext, useState } from "react"
import { api_login, logout } from "../API/action"
import history from "../history"
import userContext from "./userContext"

export const UnauthenticationApp = (props) => {
    return (
        <>
        <div>Hello from unauthenticated </div>
        </>
    )
}


