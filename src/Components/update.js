import { useContext, useEffect, useState } from "react"
import { api_get_student, api_update_student } from "../API/action"
import { ChangePassword } from "./change_password"
import {ChangeInfo} from './change_info'
import Footer from "./footer";


export const Update = () => {
    return (
        <div>
            <br />
            <br />
            <ChangeInfo/>
            <ChangePassword/>
            <br />
            <Footer />
        </div>
    )
}