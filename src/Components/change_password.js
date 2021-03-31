import React, { useState } from "react"
import { api_update_passowrd } from "../API/action"
import authenticationService from "../API/authenticationService"



export const ChangePassword = () => {
    const [form, setForm] = useState({
        "old_password": "",
        "password": "",
        "conf_password": ""
    })
    const account = authenticationService.currentAccountValue()

    const onSubmitForm = (e) => {
        e.preventDefault()
        api_update_passowrd(form.old_password, form.password, (msg) => console.log(msg))

    }
    if (!account) {
        return <div>You are not log in!</div>
    }
    if (form) {
        return (
            <div className="col-7 body_font">
                <h1>Change Password </h1>
                <form onSubmit={onSubmitForm}>
                    <div>
                        <label>Old password: </label>
                        <input className="form-control" value={form.old_password} type="password" onChange={(e) => setForm({ ...form, old_password: e.target.value })} />
                    </div>

                    <div>
                        <label>New password: </label>
                        <input className="form-control" value={form.password} type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    </div>
                    <div>
                        <label>Conf password: </label>
                        <input className="form-control" value={form.conf_password} type="password" onChange={(e) => setForm({ ...form, conf_password: e.target.value })} />
                    </div>

                    <button className="btn btn-success mt-3">Update</button>
                </form>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}