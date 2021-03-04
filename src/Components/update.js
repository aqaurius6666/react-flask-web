import { ChangePassword } from "./change_password"
import { ChangeInfo } from './change_info'
import Footer from "./footer";
import React, { useContext, useEffect, useState } from "react";
import { userService } from "../API/service";
import { loadingContext } from "../Components/loadingContext"
import Loading from "./loading";

export const Update = () => {
    const [form, setForm] = useState(userService.currentUserValue())
    const { loading, setLoading } = useContext(loadingContext)
    useEffect(() => {
        setLoading(true)
        userService.getUser().then(data => {
            console.log(data)
            setForm(data)
            setLoading(false)
        })
    }, [])
    if (!loading) {
        console.log(form)
        return (
            <div>
                <br />
                <br />
                <ChangeInfo form={form} setForm={setForm} />
                <ChangePassword />
                <br />
                <Footer />
            </div>
        )
    }

}