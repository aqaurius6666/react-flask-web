import { ChangePassword } from "./change_password"
import {ChangeInfo} from './change_info'
import Footer from "./footer";
import React, { useContext, useEffect, useState } from "react";
import { userService } from "../API/service";
import {loadingContext} from "../Components/loadingContext"

export const Update = () => {
    const [form, setForm] = useState(userService.currentUserValue())
    const {setLoading} = useContext(loadingContext)
    useEffect(() => {
        setLoading(true)
        userService.getUser().then(data => {
            setForm(data)
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <br />
            <br />
            <ChangeInfo form={form} setForm={setForm} />
            <ChangePassword/>
            <br />
            <Footer />
        </div>
    )
}