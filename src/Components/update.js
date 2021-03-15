import { ChangePassword } from "./change_password"
import { ChangeInfo } from './change_info'
import Footer from "./footer";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import userService from "../API/userService";

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
            <br />
            <br />
            <div className="container">
                <ChangeInfo form={form} setForm={setForm} />
                <ChangePassword />
            </div>
            <br />
            <Footer />
        </>
    )
}
