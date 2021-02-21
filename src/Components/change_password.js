import { useContext, useEffect, useState } from "react"
import { api_get_student, api_update_passowrd, api_update_student } from "../API/action"
import userContext from "./userContext"

export const ChangePassword = (props) => {
    const [form, setForm] = useState({
        "old_password": "",
        "password": "",
        "conf_password": ""
    })
    const { user } = useContext(userContext)

    const onSubmitForm = (e) => {
        e.preventDefault()
        api_update_passowrd(form.old_password, form.password, (msg) => console.log(msg))

    }
    if (!user) {
        return <div>You are not log in!</div>
    }
    if (form) {
        return (
            <form onSubmit={onSubmitForm}>
                <div>
                    <label>Old password: </label>
                    <input value={form.old_password} type="password" onChange={(e) => setForm({ ...form, old_password: e.target.value })}></input>
                </div>

                <div>
                    <label>New password: </label>
                    <input value={form.password} type="password" onChange={(e) => setForm({ ...form, password: e.target.value })}></input>
                </div>
                <div>
                    <label>Conf password: </label>
                    <input value={form.conf_password} type="password" onChange={(e) => setForm({ ...form, conf_password: e.target.value })}></input>
                </div>

                <button>Update</button>
            </form>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }

}