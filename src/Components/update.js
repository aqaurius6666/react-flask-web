import { ChangePassword } from "./change_password"
import { ChangeInfo } from './change_info'
import Footer from "./footer";
import React, { useContext, useEffect, useState } from "react";
import { userService } from "../API/service";
import { loadingContext } from "../Components/loadingContext"
import Loading from "./loading";

export const Update = () => {
    const [form, setForm] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true)
        userService.getUser().then(data => {
            setForm(data)
        })
        .then(() => setLoading(false))
        .catch(() => setLoading(false))
        return () => setLoading(false)
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <>

            <div>
                <br />
                <br />
                <ChangeInfo form={form} setForm={setForm} />
                <ChangePassword />
                <br />
                <Footer />
            </div>
        </>
    )
}
