import { useContext, useEffect, useState } from "react"
import { api_get_student, api_update_student } from "../API/action"
import { ChangePassword } from "./change_password"
import {ChangeInfo} from './change_info'
import userContext from "./userContext"

export const Update = (props) => {
    return (
        <>
        <ChangeInfo/>
        <ChangePassword/>
        </>
    )
}